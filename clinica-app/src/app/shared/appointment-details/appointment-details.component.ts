import { TranslationService } from 'src/app/translation.service';
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
  data;
  review;
  poll;
  patient;
  doctor;
  patientComment;
  props = [];
  types = UserType;
  loading = false;

  constructor(
    public ts: TranslationService,
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

        if(this.auth.currentUser.type == this.types.Patient){
          this.poll = [data.poll['frequency'], data.poll['puntuality']];
        }else{
          this.poll = data.patientReview ? [...data.patientReview.poll] : null;
        }

        this.patientComment = data.patientReview ? data.patientReview.review : null;
        this.data = data.data;

        for(let prop in data) this.props.push(prop);

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
