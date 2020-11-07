import { User } from './../../models/user';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { faUserCog, faUserMd, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UserType } from '../../models/user';

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
  enabled: boolean = true;

  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.userAsigned.subscribe((user: User) => {
      if(user && user.type){

        this.setUserType(user);

        if(this.userType == UserType.Patient){
          this.getUserPictures();
        }
      }
    });

    if(this.auth.currentUser){
      this.setUserType(this.auth.currentUser);

      if(this.userType == UserType.Patient){
        this.getUserPictures();
      }
    }
  }

  setUserType(user: User){
    this.userType = user.type;
    this.enabled = user.type != UserType.Staff;

    if(this.userType == UserType.Admin){
      this.icon = faUserCog;
      this.typeTranslation = 'administrador';
    }else if(this.userType == UserType.Staff){
      this.icon = faUserMd;
      this.typeTranslation = 'profesional';
      this.enabled = user.enabled;
    }
  }

  getUserPictures(){
    this.auth.getUserPictures().forEach(
      sub => sub.subscribe(url => this.profilePictures.push(url))
    );
  }
}