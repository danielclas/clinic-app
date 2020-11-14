import { Notification } from './../../models/notification';
import { NotifyService } from './../../services/notify.service';
import { AppointmentsService } from './../../services/appointments.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppointmentStatus } from 'src/app/models/appointments';

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.css']
})
export class PatientAppointmentsComponent implements OnInit {

  status = AppointmentStatus;
  appointments = [];
  selected;
  loading = true;
  constructor(private notify: NotifyService, private auth: AuthenticationService, private appoint: AppointmentsService) { }

  ngOnInit(): void {
    this.loading = true;
    this.appoint.getPatientAppointments(this.auth.currentUser.uid)
    .snapshotChanges().subscribe(
      ref => {
        this.appointments = [];
        ref.forEach(
          item => {
            let doc = item.payload.doc;
            let professional = doc.get('professional');
            let include = [this.status.Done, this.status.Rejected].some(a => a == doc.get('status'));
            let date = new Date();
            date.setDate(date.getDate() + 15);

            if(!include && doc.get('date').toDate() > Date.now() && doc.get('date').toDate() < date){
              this.appoint.getPatientInfo(professional).subscribe(
                res => {

                  let user = res.docs[0];
                  this.appointments.push({
                    'status': doc.get('status'),
                    'date': doc.get('date').toDate(),
                    'professional': user.get('name') + ' ' + user.get('surname'),
                    'staffuid': professional,
                    'uid': doc.id
                  });
              });
            }
          }
        )

        this.loading = false;
      }
    )
  }

  onRowSelected(selected){
    if(selected == this.selected) this.selected = undefined;
    else this.selected = selected;
  }

  onUpdateStatus(status: AppointmentStatus){

    this.loading = true;
    let patient = this.auth.currentUser.name + ' ' + this.auth.currentUser.surname;
    let message = 'Su turno con el paciente ' + patient + ' para el día ' + this.selected.date + ' cambió al estado ' + status;

    this.appoint.updateAppointmentStatus(status, this.selected.uid).then(
      () => {
        this.loading = false;
        this.notify.toastNotify('Estado de turno actualizado', 'El estado del turno fue cambiado a <b>' + status + '</b>');
        this.notify.pushNotify(new Notification(new Date(), this.selected.staffuid, message));
      },
      () => {
        this.loading = false;
        this.notify.toastNotify('Error actualizando el turno', 'El estado del turno no pudo ser actualizado');
      }
    );

    this.selected = undefined;
  }

}
