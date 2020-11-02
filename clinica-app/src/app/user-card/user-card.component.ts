import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { faUserCog, faUserMd, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UserType } from '../models/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  icon: IconDefinition = faUser;
  userType: UserType = UserType.Patient;
  typeTranslation: string = 'paciente';
  profilePictures: string[] = [];
  userLoaded: boolean = false;
  enabled: boolean = true;

  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.userData.subscribe(res => {
      setTimeout(() => {
        this.setUserType();

        this.enabled = this.auth.currentUser.enabled;
        if(this.userType == UserType.Patient){
          this.getUserPictures();
        }
        this.userLoaded = true;
      }, 1000);
    });
  }

  setUserType(){
    this.userType = this.auth.currentUser.type;

    if(this.userType == UserType.Admin){
      this.icon = faUserCog;
      this.typeTranslation = 'administrador'
    }else if(this.userType == UserType.Staff){
      this.icon = faUserMd;
      this.typeTranslation = 'profesional'
    }
  }

  getUserPictures(){
    this.auth.getUserPictures().forEach(
      sub => sub.subscribe(url => this.profilePictures.push(url))
    );
  }
}
