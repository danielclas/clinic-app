import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Upload } from '../models/upload';
import {User, UserType} from '../models/user';
import { finalize } from "rxjs/operators";

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

  uploadFile(data: Upload, filename: string){

    return this.storage.upload(filename, data.file);
  }

  fileRef(filename: string){
    return this.storage.ref(filename);
  }
  //dynamic user exists

  signUp(user: User, password: string, files?: Upload[]) {
    this.auth.createUserWithEmailAndPassword(user.email, password).then(
      res => {
        user.uid = res.user.uid;

        if(user.type == UserType.Patient){
          //upload file, then upload file, then addtouserscollection
          user.pictures = [Date.now().toString()];
          this.uploadFile(files[0], user.pictures[0]).then(
            res => {
              user.pictures.push(Date.now().toString());
              this.uploadFile(files[1], user.pictures[1]).then(
                res => {
                  user.enabled = true;
                  this.addToUsersCollection(user);
                }
              )
            }
          )
        }else{
          this.addToUsersCollection(user);
        }
      },
      err => console.log(err)
    ).catch();
  }

  addToUsersCollection(user: User){
    this.firestore.collection('users').add({...user}).then(
      res => alert("CREADO!")
    );
  }

  getSignInMethods(email: string){
    return this.auth.fetchSignInMethodsForEmail(email);
  }

  getSpecialties(){
    return this.firestore.collection('specialties').get();
  }

  getCurrentUser(){
    return this.currentUser;
  }

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  setUser(uid: string){
    console.log("el que llega: "+uid);
    this.firestore.collection('users').get().subscribe(ref => {
      let exists = ref.docs.some(doc => doc.get('uid') == uid+"a");
      console.log(exists);
    });
  }

  /* Sign out */
  SignOut() {
    this.auth.signOut();
  }
}
