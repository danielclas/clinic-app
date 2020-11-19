import { Component, OnInit } from '@angular/core';
import { AnimateGallery } from 'src/app/animations';
import { User, UserType } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';
import * as constants from './constants';

@Component({
  selector: 'app-cards-board',
  templateUrl: './cards-board.component.html',
  styleUrls: ['./cards-board.component.css'],
  animations: [AnimateGallery]
})

export class CardsBoardComponent implements OnInit {

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
