import { COLLECTION_NOTIFICATIONS } from './constants';
import { Notification } from './../models/notification';
import { AngularBootstrapToastsService } from 'angular-bootstrap-toasts';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection, DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  options = {
    showProgressLine: true,
    pauseDurationOnMouseEnter: true,
    bodyClass: 'toastText',
    duration: 5000
  }

  constructor(private toast: AngularBootstrapToastsService, private auth: AngularFireAuth, private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  toastNotify(title: string, text: string){
    this.toast.showSimpleToast({title, text, ...this.options});
  }

  pushNotify(notification: Notification){
    this.firestore.collection(COLLECTION_NOTIFICATIONS).add({...notification});
  }

  getPendingNotifications(){
    return this.firestore.collection(COLLECTION_NOTIFICATIONS);
  }

  dismissNotificacion(id: string){
    this.firestore.collection(COLLECTION_NOTIFICATIONS).doc(id).update({'seen':true});
  }
}
