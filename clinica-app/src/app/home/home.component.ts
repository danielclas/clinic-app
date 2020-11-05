import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User, UserType } from '../models/user';
import * as constants from './constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  layout = [];

  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.userAsigned.subscribe(
      (user: User) => {
        this.asignLayout(user);
      }
    )

    if(this.auth.currentUser) this.asignLayout(this.auth.currentUser);
  }

  asignLayout(user: User){

    if(user && user.type){
      switch(user.type){
        case UserType.Admin:
          this.layout = constants.admin;
          break;
        case UserType.Patient:
          this.layout = constants.patient;
          break;
        case UserType.Staff:
          this.layout = constants.staff;
          break;
      }
    }
  }

}
