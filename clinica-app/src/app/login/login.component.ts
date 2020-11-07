import { NotifyService } from './../services/notify.service';
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
  form: FormGroup;

  constructor(
      private notify: NotifyService,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private auth: AuthenticationService
  ) {
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  ngOnInit() {

      this.form = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  signIn() {
    this.loading = true;

    this.auth.getSignInMethods(this.email.value).then(
      res => {
        if(res.length > 0){
          this.auth.signIn(this.email.value, this.password.value).then(
            res => {
              this.router.navigateByUrl('/home');
              this.loading = false;
            },
            err => {
              this.notify.toastNotify('Error realizando el login', 'Hubo un error intentando ingresar a su cuenta. Intente más tarde');
              this.loading = false;
            }
          )
        }else{
          this.notify.toastNotify('Usuario inexistente', 'No existe un usuario con el correo <b>' + this.email.value + '</b>');
          this.loading = false;
        }
      }
    )
  }

  navigateToRegister(){
    this.router.navigateByUrl('/register');
  }
}
