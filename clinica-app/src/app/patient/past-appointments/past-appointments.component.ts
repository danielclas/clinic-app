import { Component, OnInit } from '@angular/core';
import { AppointmentStatus } from 'src/app/models/appointments';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-past-appointments',
  templateUrl: './past-appointments.component.html',
  styleUrls: ['./past-appointments.component.css']
})
export class PastAppointmentsComponent implements OnInit {

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
            let include = [this.status.Done].some(a => a == doc.get('status'));

            if(include && doc.get('date').toDate() < Date.now()){
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

}
