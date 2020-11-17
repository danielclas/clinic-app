import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTimesCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-patient-review',
  templateUrl: './patient-review.component.html',
  styleUrls: ['./patient-review.component.css']
})
export class PatientReviewComponent implements OnInit {

  @Input() appointmentUID;

  icon: IconDefinition = faTimesCircle;
  form: FormGroup;
  loading: boolean = false;

  //Poll
  communication: number;
  puntuality: number;

  constructor(
    private notify: NotifyService,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private activeModal: NgbModal,
    private ap: AppointmentsService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      review: ['', [Validators.required]],
      communication: ['', [Validators.required]],
      puntuality: ['', [Validators.required]]
    });
  }

  get review() { return this.form.get('review'); }
  get fCommunication() { return this.form.get('communication'); }
  get fPuntuality() { return this.form.get('puntuality'); }

  close(){
    this.activeModal.dismissAll();
  }

  update(){

    let obj = {
      'patientReview':{
        'review': this.review.value,
        'poll': [this.fCommunication.value, this.fPuntuality.value]
      }
    }

    this.ap.updateAppointment(obj, this.appointmentUID).then(
      res => {
        this.notify.toastNotify('Reseña completada', 'La información del turno fue registrada exitosamente');
        this.close();
      },
      err => {
        this.notify.toastNotify('Error', 'Hubo un error registrando la reseña, intente nuevamente');
        this.loading = false;
      }
    )
  }

}
