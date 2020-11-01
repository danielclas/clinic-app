import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserType } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { faEnvelopeSquare, faKey } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
export class AdminAddComponent implements OnInit {

  emailIcon = faEnvelopeSquare;
  passwordIcon = faKey;
  form: FormGroup;

  constructor(
    private auth: AuthenticationService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get name() { return this.form.get('name'); }
  get surname() { return this.form.get('surname'); }

  signUp(){
    let user: User = new User();
    user.email = this.email.value;
    user.name = this.name.value;
    user.surname = this.surname.value;
    user.type = UserType.Admin

    this.auth.signUp(user, this.password.value);

  }

  informError(){
    alert('El usuario ya existe!');
  }

  onRegister(){
    this.auth.getSignInMethods(this.email.value).then(
      res => {
        if(res.length == 0) this.signUp();
        else this.informError();
      },
      err => this.informError()
    );
  }

}
