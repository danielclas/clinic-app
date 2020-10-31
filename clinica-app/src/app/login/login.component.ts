import { AuthenticationService } from './../services/authentication.service';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  form: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private auth: AuthenticationService
  ) {
      // redirect to home if already logged in
      // if (this.authenticationService.currentUserValue) {
      //     this.router.navigate(['/']);
      // }
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  ngOnInit() {

      // Get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

      this.form = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields

  signIn() {
    this.auth.getSignInMethods(this.email.value).then(
      res => {
        if(res.length > 0){
          this.auth.signIn(this.email.value, this.password.value).then(
            res => {
              this.router.navigateByUrl('/home');
            },
            err => console.log("Err: "+err)
          )
        }else{
          alert("No existe el usuario");
        }
      }
    )
  }

  // signIn() {
  //   this.auth.signIn(this.email, this.password);
  //   this.reset();
  // }

  // reset(){
  //   this.email = '';
  //   this.password = '';
  // }

  signOut() {
    this.auth.SignOut();
  }

  navigateToRegister(){
    this.router.navigateByUrl('/register');
  }
}
