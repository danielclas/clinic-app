import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection, DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Upload } from '../models/upload';
import {User, UserType} from '../models/user';
import { finalize } from "rxjs/operators";
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  userData: Observable<firebase.User>;
  currentUser: User;

  constructor(private notify: NotifyService, private auth: AngularFireAuth, private firestore: AngularFirestore, private storage: AngularFireStorage) {
    this.userData = auth.authState;
    this.userData.subscribe(res => this.asignToCurrentUser(res.uid));
  }

  getUserPictures(){
    return [
      this.storage.ref(this.currentUser.pictures[0]).getDownloadURL(),
      this.storage.ref(this.currentUser.pictures[1]).getDownloadURL()
    ];
  }

  uploadFile(data: Upload, filename: string){
    return this.storage.upload(filename, data.file);
  }

  fileRef(filename: string){
    return this.storage.ref(filename);
  }

  signUp(user: User, password: string, files?: Upload[]) {
    this.auth.createUserWithEmailAndPassword(user.email, password).then(
      res => {
        user.uid = res.user.uid;

        if(user.type == UserType.Patient){
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
    return this.firestore.collection('specialties');
  }

  getCurrentUser(){
    return this.currentUser;
  }

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  getAllUsers(){
    return this.firestore.collection('users');
  }

  setUserApproval(uid: string){

    this.firestore.collection('users', ref => {
      return ref.where('uid', '==', uid);
    }).get().subscribe(ref => {
      this.firestore.collection('users').doc(ref.docs[0].id).update({'enabled':true});
    });
  }

  addSpecialty(label: string){
    this.firestore.collection('specialties').add({label}).then(
      res => {
        this.notify.notify('Especialidad agregada', 'La especialidad fue agregada con éxito');
      }
    );
  }

  private asignToCurrentUser(uid: string){
    this.firestore.collection('users').get()
      .subscribe(ref => {
        let user = ref.docs.find(doc => doc.get('uid') == uid);
        let temp = new User();

        temp.uid = user.get('uid');
        temp.name = user.get('name');
        temp.surname = user.get('surname');
        temp.type = user.get('type');
        temp.email = user.get('email');
        temp.enabled = user.get('enabled');
        temp.pictures = user.get('pictures');
        temp.specialties = user.get('specialties');

        this.currentUser = temp;
      });
  }

  /* Sign out */
  SignOut() {
    this.auth.signOut();
  }
}
