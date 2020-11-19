import { AnimateGallery } from './../../animations';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserCardComponent } from 'src/app/layout/user-card/user-card.component';
import { AppointmentStatus } from 'src/app/models/appointments';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotifyService } from 'src/app/services/notify.service';
import { AppointmentComponent } from '../appointment/appointment.component';

@Component({
  selector: 'app-attend-appointment',
  templateUrl: './attend-appointment.component.html',
  styleUrls: ['./attend-appointment.component.css'],
  animations: [AnimateGallery]
})
export class AttendAppointmentComponent implements OnInit {

  appointments: any[];
  selected;
  loading = false;

  constructor(private notify: NotifyService, private appoint: AppointmentsService, private auth: AuthenticationService, private modal: NgbModal) { }

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

                //If appointment was accepted by doctor and appointment date is before today
                if(Date.now() >= doc.get('date').toDate() && doc.get('status') == AppointmentStatus.Accepted){
                  this.appointments.push({
                    'status': doc.get('status'),
                    'date': doc.get('date').toDate(),
                    'patient': user.get('name') + ' ' + user.get('surname'),
                    'patientuid': patient,
                    'uid': doc.id
                  });
                }
            });
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

  open(){
    let ref = this.modal.open(AppointmentComponent, {size: 'lg', centered: true, backdrop:'static', scrollable: true});
    ref.componentInstance.appointmentUID = this.selected.uid;
  }
}
