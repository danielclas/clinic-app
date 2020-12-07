import { TranslationService } from 'src/app/translation.service';
import { AnimateGallery } from './../../animations';
import { PatientReviewComponent } from './../patient-review/patient-review.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentStatus } from 'src/app/models/appointments';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotifyService } from 'src/app/services/notify.service';
import { AppointmentDetailsComponent } from 'src/app/shared/appointment-details/appointment-details.component';

@Component({
  selector: 'app-past-appointments',
  templateUrl: './past-appointments.component.html',
  styleUrls: ['./past-appointments.component.css'],
  animations: [AnimateGallery]
})
export class PastAppointmentsComponent implements OnInit {

  status = AppointmentStatus;
  statusValues = [];
  statusSelected = [];
  filteredAppointments = [];
  appointments = [];
  selected;
  loading = true;
  constructor(
    public ts: TranslationService,
    private notify: NotifyService,
    private auth: AuthenticationService,
    private appoint: AppointmentsService,
    private modal: NgbModal) { }

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
                    'uid': doc.id,
                    'patientReview': doc.get('patientReview')
                  });
              });
            }
          }
        )

        this.loading = false;
        this.filterAppointments();
      }
    )

    this.statusValues = Object.values(this.status);
  }

  onStatusSelected(status){
    if(this.statusSelected.some(s => s == status)){
      this.statusSelected = this.statusSelected.filter(s => s != status);
    }else{
      this.statusSelected.push(status);
    }

    this.filterAppointments();
  }

  filterAppointments(){
    if(this.statusSelected.length == 0){
      this.filteredAppointments = this.appointments;
    }else{
      this.filteredAppointments = this.appointments.filter(a => this.statusSelected.includes(a.status));
    }
  }

  onRowSelected(row){
    if(row == this.selected) this.selected = null;
    else this.selected = row;
  }

  viewDetails(){
    let ref = this.modal.open(AppointmentDetailsComponent, {size: 'lg', centered: true, scrollable: true});
    ref.componentInstance.appointmentUID = this.selected.uid;
  }

  putReview(){
    let ref = this.modal.open(PatientReviewComponent, {size: 'lg', centered: true, scrollable: true});
    ref.componentInstance.appointmentUID = this.selected.uid;
  }

}
