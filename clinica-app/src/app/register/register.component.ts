import { UserType } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { faEnvelopeSquare, faKey, faPortrait } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  name: string;
  surname: string;
  email: string;
  password: string;
  userType: string = 'Usuario';
  picture1: string;
  picture2: string;

  formData = new FormData();
  fileForm = new FormGroup({
    file1: new FormControl(null, Validators.required),
    file2: new FormControl(null)
  });

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
      this.types = Object.values(UserType);
      this.auth.getSpecialties().subscribe(a => {
        a.docs.forEach(b => console.log(b.get('label')))
      });
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

  onFileChange(event){
    console.log('onfilechange');
    this.formData.append('file', event.target.files[0], event.target.files[0].name);
    this.auth.uploadFile(event.target.files[0].name, this.formData.get('file'));
  }
}
