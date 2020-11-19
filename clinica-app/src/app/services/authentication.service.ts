import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Upload } from '../models/upload';
import {User, UserType} from '../models/user';
import { NotifyService } from './notify.service';
import { EventEmitter } from '@angular/core';
import {COLLECTION_LOGS, COLLECTION_SPECIALTIES, COLLECTION_USERS} from './constants';
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  userAsigned = new EventEmitter<User>();
  userData: Observable<firebase.User>;
  currentUser: User;

  constructor(private notify: NotifyService, private auth: AngularFireAuth, private firestore: AngularFirestore, private storage: AngularFireStorage) {
    this.userData = auth.authState;
    this.userData.subscribe(res => {
      if(res && res.uid) this.asignToCurrentUser(res.uid);
      else this.currentUser = undefined;
    });
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
    return this.auth.createUserWithEmailAndPassword(user.email, password).then(
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
    );
  }

  addToUsersCollection(user: User){
    this.firestore.collection(COLLECTION_USERS).add({...user}).then(
      res => {
        let name = '<b>' + user.name + ' ' + user.surname +'</b>';
        this.notify.toastNotify('Usuario agregado', 'El usuario ' + name + ' fue registrado exitosamente');
      }
    );
  }

  getSignInMethods(email: string){
    return this.auth.fetchSignInMethodsForEmail(email);
  }

  getSpecialties(){
    return this.firestore.collection(COLLECTION_SPECIALTIES);
  }

  getCurrentUser(){
    return this.currentUser;
  }

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  getAllUsers(){
    return this.firestore.collection(COLLECTION_USERS);
  }

  setUserApproval(uid: string, name: string){

    return this.firestore.collection(COLLECTION_USERS, ref => {
      return ref.where('uid', '==', uid);
    }).get().subscribe(ref => {
      this.firestore.collection(COLLECTION_USERS).doc(ref.docs[0].id).update({'enabled':true}).then(
        res => {
          this.notify.toastNotify('Profesional aprobado', 'El profesional <b>'+ name +'</b> fue aprobado con éxito');
        }
      );
    });
  }

  addSpecialty(label: string){
    return this.firestore.collection(COLLECTION_SPECIALTIES).add({label}).then(
      res => {
        this.notify.toastNotify('Especialidad agregada', 'La especialidad <b>' + label + '</b> fue agregada con éxito');
      }
    );
  }

  logSignUp(uid: string){
    return this.firestore.collection(COLLECTION_LOGS, ref => {
      return ref.where('user', '==', uid);
    }).get().subscribe(
      res => {

        if(res.docs.length == 0){
          this.firestore.collection(COLLECTION_LOGS).add({
            'user':uid,
            'entries':[new Date()]
          })
        }else{
          let doc = res.docs[0];
          let arr = doc.get('entries');
          let name = this.currentUser.name + ' ' + this.currentUser.surname;

          arr.push(new Date());

          this.firestore.collection(COLLECTION_LOGS).doc(doc.id).update({'entries':arr, 'userName':name});
        }
      }
    )
  }

  private asignToCurrentUser(uid: string){
    this.firestore.collection(COLLECTION_USERS).get()
      .subscribe(ref => {
        let user = ref.docs.find(doc => doc.get('uid') == uid);
        this.currentUser = user.data() as User;
        this.userAsigned.emit(this.currentUser);

        if(this.currentUser.type == UserType.Staff){
          this.logSignUp(this.currentUser.uid);
        }
      });
  }

  SignOut() {
    return this.auth.signOut();
  }
}
