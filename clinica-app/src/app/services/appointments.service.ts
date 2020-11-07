import { AppointmentStatus } from './../models/appointments';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthenticationService } from './authentication.service';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private userAuth: AuthenticationService, private notify: NotifyService, private auth: AngularFireAuth, private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  setStaffSchedule(schedule){
    return this.firestore.collection('users', ref => {
      return ref.where('uid', '==', this.userAuth.currentUser.uid);
    }).get().subscribe(ref => {
      this.firestore.collection('users').doc(ref.docs[0].id).update({'schedule':schedule}).then(
        res => {
          this.notify.toastNotify('Horarios modificados', 'Sus horarios fueron modificados exitosamente');
        },
        err => {
          this.notify.toastNotify('Error modificando horarios', 'Hubo un error modificando sus horarios. Intente nuevamente.');
        }
      );
    });
  }

  getStaffAppointments(staffUid: string){
    return this.firestore.collection('appointments', ref => {
      return ref.where('professional', '==', staffUid);
    });
  }

  updateAppointmentStatus(status: AppointmentStatus, uid: string){
    return this.firestore.collection('appointments').doc(uid).update({'status':status});
  }

  getPatientInfo(patientUid: string){
    return this.firestore.collection('users', ref => {
      return ref.where('uid', '==', patientUid);
    }).get();
  }


}
