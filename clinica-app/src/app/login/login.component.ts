import { AuthenticationService } from './../services/authentication.service';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  email: string;
  password: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private auth: AuthenticationService
  ) {
      // redirect to home if already logged in
      // if (this.authenticationService.currentUserValue) {
      //     this.router.navigate(['/']);
      // }
  }

  ngOnInit() {

      // Get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields

  signUp() {
    this.auth.signUp(this.email, this.password);
    this.reset();
  }

  signIn() {
    this.auth.signIn(this.email, this.password);
    this.reset();
  }

  reset(){
    this.email = '';
    this.password = '';
  }

  signOut() {
    this.auth.SignOut();
  }

  navigateToRegister(){
    this.router.navigateByUrl('/register');
  }
}
