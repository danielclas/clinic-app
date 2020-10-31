import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import {User, UserType} from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  userData: Observable<firebase.User>;
  currentUser: User;
  collection: AngularFirestoreCollection<User>;

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore, private storage: AngularFireStorage) {
    this.userData = auth.authState;
    this.collection = this.firestore.collection('users');
  }

  uploadFile(filename: string, data: any, username: string = ''){
    console.log('onfileupload', data);
    this.storage.upload(filename, data);
  }

  fileRef(filename: string){
    return this.storage.ref(filename);
  }
  //dynamic user exists

  signUp(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password).then(res => {
      let uid = res.user.uid;
      let user: User = {
        uid: uid,
        email: email,
        type: UserType.Admin
      };

      this.firestore.collection('users').add(user);

    }).catch(error => {
      console.log('Something is wrong:', error.message);
    });
  }

  getSpecialties(){
    return this.firestore.collection('specialties').get();
  }

  getCurrentUser(){
    return this.currentUser;
  }

  signIn(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then(res => {
      console.log('You are Successfully logged in!', res.user.uid);
    }).catch(err => {
      console.log('Something is wrong:', err.message);
    });
  }

  /* Sign out */
  SignOut() {
    this.auth.signOut();
  }
}
