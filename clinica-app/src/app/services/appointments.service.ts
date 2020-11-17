import { UserType } from './../models/user';
import { AppointmentStatus } from './../models/appointments';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthenticationService } from './authentication.service';
import { NotifyService } from './notify.service';
import { COLLECTION_APPOINTMENTS, COLLECTION_USERS, COLLECTION_ACTIVITY } from './constants';
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
      return ref.where('professional', '==', uid).orderBy('date');
    });
  }

  getPatientAppointments(uid: string){
    return this.firestore.collection(COLLECTION_APPOINTMENTS, ref => {
      return ref.where('patient', '==', uid).orderBy('date');
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

    if(obj.status && obj.status == AppointmentStatus.Done){
      this.logSpecialtyActivity(obj, uid);
    }

    return this.firestore.collection(COLLECTION_APPOINTMENTS).doc(uid).update({...obj});
  }

  getAppointmentDetails(uid: string){
    return this.firestore.collection(COLLECTION_APPOINTMENTS).doc(uid).get();
  }

  //Called every time an appointment is completed (changed to status 'Done')
  logSpecialtyActivity(obj, uid){
    let arr = this.userAuth.currentUser.specialties;

    for(let specialty of arr){
      this.firestore.collection(COLLECTION_ACTIVITY, ref => {
        return ref.where('label', '==', specialty);
      }).get().subscribe(
        res => {
          if(res.docs.length == 0){
            this.firestore.collection(COLLECTION_ACTIVITY).add({
              'label':specialty,
              'log':[new Date()]
            })
          }else{
            let doc = res.docs[0];
            let arr = doc.get('log');

            arr.push(new Date());

            this.firestore.collection(COLLECTION_ACTIVITY).doc(doc.id).update({'log':arr});
          }
        }
      )
    }
  }
}
