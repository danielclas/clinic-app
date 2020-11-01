import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { faUserCog, faUserMd, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UserType } from '../models/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  icon: IconDefinition;
  userType: UserType = UserType.Patient;
  typeTranslation: string = 'paciente';
  profilePictures: string[] = [];

  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.setUserType();

    if(this.userType == UserType.Patient){
      this.getUserPictures();
    }
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
