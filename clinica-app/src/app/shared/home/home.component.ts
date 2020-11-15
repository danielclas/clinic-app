import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, UserType } from '../../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.auth.SignOut();
  }

}
