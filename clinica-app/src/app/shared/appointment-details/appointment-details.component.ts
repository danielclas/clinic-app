import { UserType } from '../../models/user';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {

  @Input() appointmentUID;

  date;
  review;
  poll;
  patient;
  doctor;
  doctorComment;
  patientComment;
  types = UserType;
  loading = false;

  constructor(
    private ap: AppointmentsService,
    public auth: AuthenticationService,
    private activeModal: NgbModal
    ) { }

  ngOnInit(): void {
    this.loading = true;
    this.ap.getAppointmentDetails(this.appointmentUID).subscribe(
      res => {
        let data = res.data();

        this.date = data.date.toDate();
        this.review = data.review;
        this.poll = [data.poll['frequency'], data.poll['puntuality']];

        this.patientComment = data.patientComment;
        this.doctorComment = data.doctorComment;

        console.log(this.poll);
        this.ap.getPatientInfo(data.patient).subscribe(
          res => {
            let doc = res.docs[0];

            this.patient = doc.get('name') + ' ' + doc.get('surname');
            this.loading = false;
          }
        )
      }
    )
  }
}
