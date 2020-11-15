import { UserType } from './../models/user';
import { AppointmentStatus } from './../models/appointments';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthenticationService } from './authentication.service';
import { NotifyService } from './notify.service';
import {COLLECTION_APPOINTMENTS, COLLECTION_USERS} from './constants';
@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(
    private userAuth: AuthenticationService,
    private notify: NotifyService,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage) { }

  setStaffSchedule(schedule){
    return this.firestore.collection(COLLECTION_USERS, ref => {
      return ref.where('uid', '==', this.userAuth.currentUser.uid);
    }).get().subscribe(ref => {
      this.firestore.collection(COLLECTION_USERS).doc(ref.docs[0].id).update({'schedule':schedule}).then(
        res => {
          this.notify.toastNotify('Horarios modificados', 'Sus horarios fueron modificados exitosamente');
        },
        err => {
          this.notify.toastNotify('Error modificando horarios', 'Hubo un error modificando sus horarios. Intente nuevamente.');
        }
      );
    });
  }

  getStaffAppointments(uid: string){
    return this.firestore.collection(COLLECTION_APPOINTMENTS, ref => {
      return ref.where('professional', '==', uid);
    });
  }

  getPatientAppointments(uid: string){
    return this.firestore.collection(COLLECTION_APPOINTMENTS, ref => {
      return ref.where('patient', '==', uid);
    });
  }

  updateAppointmentStatus(status: AppointmentStatus, uid: string){
    return this.firestore.collection(COLLECTION_APPOINTMENTS).doc(uid).update({'status':status});
  }

  getPatientInfo(patientUid: string){
    return this.firestore.collection(COLLECTION_USERS, ref => {
      return ref.where('uid', '==', patientUid);
    }).get();
  }

  getStaffMembers(){
    return this.firestore.collection(COLLECTION_USERS).ref.where('type', '==', UserType.Staff).where('enabled', '==', true);
  }

  newAppointment(item){
    return this.firestore.collection(COLLECTION_APPOINTMENTS).add({...item});
  }

  updateAppointment(obj, uid){
    return this.firestore.collection(COLLECTION_APPOINTMENTS).doc(uid).update({...obj});
  }

  getAppointmentDetails(uid: string){
    return this.firestore.collection(COLLECTION_APPOINTMENTS).doc(uid).get();
  }

}
