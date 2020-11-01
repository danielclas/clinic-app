import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User, UserType } from '../models/user';
import { faUserCog, faUserMd, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  icon: IconDefinition;
  userType: UserType = UserType.Patient;
  typeTranslation: string = 'paciente';
  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.userType = this.auth.currentUser.type;

    if(this.userType == UserType.Admin){
      this.icon = faUserCog;
      this.typeTranslation = 'administrador'
    }else if(this.userType == UserType.Staff){
      this.icon = faUserMd;
      this.typeTranslation = 'profesional'
    }
  }

}
