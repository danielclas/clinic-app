import { NotifyService } from './../services/notify.service';
import { User, UserType } from './../models/user';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('pillsContainer') container;

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
      private notify: NotifyService,
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

      this.auth.getSpecialties().get().subscribe(ref => {
        ref.docs.forEach(doc => this.specialties.push(doc.get('label')));
      });

      this.form = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        name: ['', [Validators.required, Validators.minLength(3)]],
        surname: ['', [Validators.required, Validators.minLength(3)]]
      });

  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get name() { return this.form.get('name'); }
  get surname() { return this.form.get('surname'); }

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
    this.notify.toastNotify('Error registrando usuario', 'Ya existe un usuario con ese correo');
  }

  signUp(){

    this.loading = true;

    let user: User = new User();
    user.email = this.email.value;
    user.name = this.name.value;
    user.surname = this.surname.value;
    user.type = this.userType == 'Usuario' ? UserType.Patient : UserType.Staff;

    if(user.type == UserType.Staff){
      user.specialties = this.selectedSpecialties;
      user.enabled = false;
      this.auth.signUp(user, this.password.value)
      .then(res => this.onSignUpSuccess());
    }else{
      this.auth.signUp(user, this.password.value, [this.picture1, this.picture2])
      .then(res => this.onSignUpSuccess());
    }
  }

  private onSignUpSuccess(){
    this.loading = false;
    this.form.reset();
    this.selectedSpecialties = [];
    this.picture1 = undefined;
    this.picture2 = undefined;

    this.resetSpecialtiesPills();
  }

  resetSpecialtiesPills(){
    if(this.container){
      let pillsContainer = <HTMLElement> this.container.nativeElement;
      pillsContainer.childNodes.forEach(child => {
        let element = <HTMLElement> child;

        if(element && element.classList.contains('badge-success')){
          element.classList.remove('badge-success');
          element.classList.add('badge-secondary');
        }
      });
    }
  }

  onRegister(){

    //If sign-in methods available, email is already registered
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

    //Switch pill color
    if(index == -1){
      this.selectedSpecialties.push(label);
      element.classList.remove('badge-secondary');
      element.classList.add('badge-success');
    }else{
      this.selectedSpecialties.splice(index, 1);
      element.classList.remove('badge-success');
      element.classList.add('badge-secondary');
    }
  }
}
