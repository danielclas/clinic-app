import { AuthenticationService } from './../../services/authentication.service';
import { Appointment, AppointmentStatus } from './../../models/appointments';
import { AppointmentsService } from './../../services/appointments.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AppointmentDetailsComponent } from '../appointment-details/appointment-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appointment-search',
  templateUrl: './appointment-search.component.html',
  styleUrls: ['./appointment-search.component.css']
})
export class AppointmentSearchComponent implements OnInit, OnChanges {

  appointments: Appointment[] = [];
  search: string;
  loading = false;

  constructor(
    private apps: AppointmentsService,
    private auth: AuthenticationService,
    private modal: NgbModal
  ) { }

  ngOnInit(){
    this.get();
  }

  ngOnChanges(){
    this.get();
  }

  get(){
    this.loading = true;

    this.apps.getAllAppointments().valueChanges({idField: 'id'})
    .subscribe(vals => {
      this.appointments = [...vals] as Appointment[];
      this.appointments = this.appointments.filter(ap => ap.status == AppointmentStatus.Done);

      this.auth.getAllUsers().valueChanges({idField: 'id'})
      .subscribe(users => {
        let arr = [...users] as User[];
        this.appointments.forEach(ap => {
          let patient = arr.find(u => u.id == ap.patient || u.uid == ap.patient);
          let doctor = arr.find(u => u.id == ap.professional || u.uid == ap.professional);

          ap.professional = doctor;
          ap.patient = patient;
        });

        this.loading = false;
      })
    })
  }

  viewDetails(ap: Appointment){
    let ref = this.modal.open(AppointmentDetailsComponent, {size: 'lg', centered: true, scrollable: true});
    ref.componentInstance.appointmentUID = ap.id;
  }

}
