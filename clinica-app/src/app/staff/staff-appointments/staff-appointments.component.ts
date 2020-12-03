import { AnimateGallery } from './../../animations';
import { AppointmentDetailsComponent } from '../../shared/appointment-details/appointment-details.component';
import { Notification } from './../../models/notification';
import { AppointmentStatus } from './../../models/appointments';
import { AuthenticationService } from './../../services/authentication.service';
import { AppointmentsService } from './../../services/appointments.service';
import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../services/notify.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-staff-appointments',
  templateUrl: './staff-appointments.component.html',
  styleUrls: ['./staff-appointments.component.css'],
  animations: [AnimateGallery]
})
export class StaffAppointmentsComponent implements OnInit {

  status = AppointmentStatus;
  statusValues = [];
  statusSelected = [];
  filteredAppointments = [];
  appointments: any[];
  selected;
  loading = false;

  constructor(
    private notify: NotifyService,
    private appoint: AppointmentsService,
    private auth: AuthenticationService,
    private modal: NgbModal
    ) { }

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
    if(selected == this.selected) this.selected = undefined;
    else this.selected = selected;
  }

  viewDetails(){
    let ref = this.modal.open(AppointmentDetailsComponent, {size: 'lg', centered: true, scrollable: true});
    ref.componentInstance.appointmentUID = this.selected.uid;
  }

}
