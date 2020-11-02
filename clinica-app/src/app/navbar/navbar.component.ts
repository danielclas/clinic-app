import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faStethoscope, faBell, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  icon = faStethoscope;
  alert = faBell;
  exit = faDoorOpen;

  constructor(public auth: AuthenticationService, private router: Router){}

  ngOnInit(): void {
  }

  onLogOutClicked(){
    this.auth.SignOut().then(res => this.router.navigateByUrl('/login'));
  }

}
