import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
  ) {
      // redirect to home if already logged in
      // if (this.authenticationService.currentUserValue) {
      //     this.router.navigate(['/']);
      // }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', Validators.required, Validators.minLength(5)],
          password: ['', Validators.required, Validators.minLength(5)]
      });

      // Get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  navigateToRegister(){
    this.router.navigateByUrl('/register');
  }

  onSubmit() {

      this.submitted = true;

      if (this.loginForm.invalid) {
          return;
      }

      // this.loading = true;

      // this.authenticationService.login(this.f.username.value, this.f.password.value)
      //     .pipe(first())
      //     .subscribe(
      //         data => {
      //             this.router.navigate([this.returnUrl]);
      //         },
      //         error => {
      //             this.alertService.error(error);
      //             this.loading = false;
      //         });
  }
}
