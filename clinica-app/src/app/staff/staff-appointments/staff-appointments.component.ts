import { Notification } from './../../models/notification';
import { AppointmentStatus } from './../../models/appointments';
import { AuthenticationService } from './../../services/authentication.service';
import { AppointmentsService } from './../../services/appointments.service';
import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'app-staff-appointments',
  templateUrl: './staff-appointments.component.html',
  styleUrls: ['./staff-appointments.component.css']
})
export class StaffAppointmentsComponent implements OnInit {

  status = AppointmentStatus;
  appointments: any[];
  selected;
  loading = false;
  constructor(private notify: NotifyService, private appoint: AppointmentsService, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.loading = true;
    this.appoint.getStaffAppointments(this.auth.currentUser.uid)
    .snapshotChanges().subscribe(
      ref => {
        this.appointments = [];
        ref.forEach(
          item => {
            let doc = item.payload.doc;
            let patient = doc.get('patient');

            this.appoint.getPatientInfo(patient).subscribe(
              res => {
                let user = res.docs[0];
                this.appointments.push({
                  'status': doc.get('status'),
                  'date': doc.get('date').toDate(),
                  'isPast': Date.now() > doc.get('date').toDate(),
                  'patient': user.get('name') + ' ' + user.get('surname'),
                  'patientuid': patient,
                  'uid': doc.id
                });
            });
          }
        )

        this.appointments = this.appointments.sort((a,b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0);
        this.loading = false;
      }
    )
  }

  onUpdateStatus(status: AppointmentStatus){

    let staff = this.auth.currentUser.name + ' ' + this.auth.currentUser.surname;
    let message = 'Su turno con el profesional ' + staff + ' para el día ' + this.selected.date + ' cambió al estado ' + status;

    this.appoint.updateAppointmentStatus(status, this.selected.uid).then(
      () => {
        this.notify.toastNotify('Estado de turno actualizado', 'El estado del turno fue cambiado a <b>' + status + '</b>');
        this.notify.pushNotify(new Notification(new Date(), this.selected.patientuid, message));
      },
      () => {
        this.notify.toastNotify('Error actualizando el turno', 'El estado del turno no pudo ser actualizado');
      }
    )
  }

  onRowSelected(selected){

    if(selected.isPast) return;

    if(selected == this.selected) this.selected = undefined;
    else this.selected = selected;
  }

}
