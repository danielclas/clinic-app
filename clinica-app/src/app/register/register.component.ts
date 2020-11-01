import { User, UserType } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { faEnvelopeSquare, faKey, faPortrait } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Upload } from '../models/upload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  emailIcon = faEnvelopeSquare;
  passwordIcon = faKey;
  portraitIcon = faPortrait;

  types: string[];
  loading = false;
  submitted = false;
  returnUrl: string;

  userType: string = 'Usuario';
  picture1: Upload;
  picture2: Upload;
  specialties: string[] = [];
  selectedSpecialties: string[] = [];

  formData = new FormData();
  form: FormGroup;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private auth: AuthenticationService,
      private formBuilder: FormBuilder
  ) {
      // redirect to home if already logged in
      // if (this.authenticationService.currentUserValue) {
      //     this.router.navigate(['/']);
      // }
  }

  ngOnInit() {
      this.types = Object.values(UserType);

      this.auth.getSpecialties().subscribe(ref => {
        ref.docs.forEach(doc => this.specialties.push(doc.get('label')));
      });

      this.form = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        name: ['', [Validators.required, Validators.minLength(3)]],
        surname: ['', [Validators.required, Validators.minLength(3)]],
        // file1: [ , Validators.required],
        // file2: [ , Validators.required]
      });
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get name() { return this.form.get('name'); }
  get surname() { return this.form.get('surname'); }
  get file1() { return this.form.get('file1'); }
  get file2() { return this.form.get('file2'); }

  navigateToRegister(){
    this.router.navigateByUrl('/register');
  }

  onFileChange(event, picture){

    let file = event.target.files.item(0);
    let upload = new Upload(file);

    if(picture == 1) this.picture1 = upload;
    else this.picture2 = upload;
  }

  informError(){
    alert('El usuario ya existe!');
  }

  signUp(){
    let user: User = new User();
    user.email = this.email.value;
    user.name = this.name.value;
    user.surname = this.surname.value;
    user.type = this.userType == 'Usuario' ? UserType.Patient : UserType.Staff;

    if(user.type == UserType.Staff){
      user.specialties = this.selectedSpecialties;
      user.enabled = false;
      this.auth.signUp(user, this.password.value);
    }else{
      this.auth.signUp(user, this.password.value, [this.picture1, this.picture2]);
    }
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
  onSpecialtyClicked(value){
    let element = <HTMLElement> value.srcElement;
    let label =  element.innerHTML.trim();
    let index = this.selectedSpecialties.indexOf(label);

    if(index == -1){
      this.selectedSpecialties.push(label);
      element.classList.remove('badge-secondary');
      element.classList.add('badge-primary');
    }else{
      this.selectedSpecialties.splice(index, 1);
      element.classList.remove('badge-primary');
      element.classList.add('badge-secondary');
    }
  }
}
