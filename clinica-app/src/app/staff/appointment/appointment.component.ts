import { AppointmentStatus } from './../../models/appointments';
import { AppointmentsService } from './../../services/appointments.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotifyService } from 'src/app/services/notify.service';
import { faTimesCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { fadeInOnEnterAnimation } from 'angular-animations/fading-entrances/fade-in.animation';
import { fadeInUpOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})

export class AppointmentComponent implements OnInit {

  @Input() appointmentUID;

  icon: IconDefinition = faTimesCircle;
  form: FormGroup;
  loading: boolean = false;

  //Poll
  frequency: number;
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
      frequency: ['', [Validators.required]],
      puntuality: ['', [Validators.required]],
      age: ['', [Validators.required]],
      bloodPressure: ['', [Validators.required]],
      bodyTemp: ['', [Validators.required]],
      firstKey: [''],
      firstValue: [''],
      secondKey: [''],
      secondValue: ['',],
      thirdKey: [''],
      thirdValue: ['']
    })
  }

  get firstKey() { return this.form.get('firstKey'); }
  get secondKey() { return this.form.get('secondKey'); }
  get thirdKey() { return this.form.get('thirdKey'); }
  get firstValue() { return this.form.get('firstValue'); }
  get secondValue() { return this.form.get('secondValue'); }
  get thirdValue() { return this.form.get('thirdValue'); }
  get review() { return this.form.get('review'); }
  get age() { return this.form.get('age'); }
  get bloodPressure() { return this.form.get('bloodPressure'); }
  get bodyTemp() { return this.form.get('bodyTemp'); }
  get fFrequency() { return this.form.get('bloodPressure'); }
  get fPuntuality() { return this.form.get('bodyTemp'); }


  onFormChange(){

    let err = {pairrequired: true};

    if((!this.firstKey.value && this.firstValue.value)){
      this.firstKey.setErrors(err);
    }else{
      this.firstKey.setErrors(null);
    }

    if((this.firstKey.value && !this.firstValue.value)){
      this.firstValue.setErrors(err);
    }else{
      this.firstValue.setErrors(null);
    }

    if((!this.secondKey.value && this.secondValue.value)){
      this.secondKey.setErrors(err);
    }else{
      this.secondKey.setErrors(null);
    }

    if((this.secondKey.value && !this.secondValue.value)){
      this.secondValue.setErrors(err);
    }else{
      this.secondValue.setErrors(null);
    }

    if((!this.thirdKey.value && this.thirdValue.value)){
      this.thirdKey.setErrors(err);
    }else{
      this.thirdKey.setErrors(null);
    }

    if((this.thirdKey.value && !this.thirdValue.value)){
      this.thirdValue.setErrors(err);
    }else{
      this.thirdValue.setErrors(null);
    }
  }

  close(){
    this.activeModal.dismissAll();
  }

  update(){
    let obj = {review: this.review.value, status: AppointmentStatus.Done};
    let data = {age: this.age.value, bodyTemp: this.bodyTemp.value, bloodPressure: this.bloodPressure.value};
    let poll = {frequency: this.fFrequency.value, puntuality: this.fPuntuality.value};

    this.loading = true;

    if(this.firstKey.value) data[this.firstKey.value] = this.firstValue.value;
    if(this.secondKey.value) data[this.secondKey.value] = this.secondValue.value;
    if(this.thirdKey.value) data[this.thirdKey.value] = this.thirdValue.value;

    obj['data'] = {...data};
    obj['poll'] = {...poll};

    this.ap.updateAppointment(obj, this.appointmentUID).then(
      res => {
        this.notify.toastNotify('Turno completado', 'La información del turno fue registrada exitosamente y el mismo cambió a estado "Hecho"');
        this.close();
      },
      err => {
        this.notify.toastNotify('Error', 'Hubo un error registrando el turno, intente nuevamente');
        this.loading = false;
      }
    )
  }
}
