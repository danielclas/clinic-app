import { TranslationService } from 'src/app/translation.service';
import { AnimateGallery } from './../../animations';
import { Appointment, AppointmentStatus } from './../../models/appointments';
import { Schedule, Days } from './../../models/staffschedule';
import { AppointmentsService } from './../../services/appointments.service';
import { NotifyService } from './../../services/notify.service';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { User } from 'src/app/models/user';
import Stepper from 'bs-stepper'
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

interface Specialty{
  label: string;
}
@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css'],
  animations: [AnimateGallery],
  changeDetection: ChangeDetectionStrategy.Default
})
export class NewAppointmentComponent implements OnInit {

  @ViewChild('select') select: ElementRef;
  @ViewChild('stepper') stepperRef: ElementRef;
  @ViewChild('confirmation') confirmation: ElementRef;

  stepper: Stepper;

  nextDate: any;
  nextHour: any;

  specialtyFilter: string;
  doctorFilter: string;
  days = Days;
  selectedDays = [];
  selectedDay;

  specialties = [];
  specialtySelected;

  doctorSelected: User;
  doctors: User[] = [];

  today: NgbDateStruct;
  max: NgbDateStruct;

  showHours = false;
  hours = [];
  date: {year: number, month: number};
  selectedDate: Date;
  confirmationDate: Date;

  loading = false;
  loadingHours = false;
  loadingDoctors = false;
  loadingConfirmation = false;
  confirmationExported = false;

  selectedSlot;
  constructor(
    public ts: TranslationService,
    private apps: AppointmentsService,
    private auth: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notify: NotifyService) { }

  ngOnInit(): void {
    this.auth.getSpecialties().snapshotChanges().subscribe(
      ref => {
        this.specialties = [];
        ref.forEach(d => this.specialties.push(d.payload.doc.get('label')));
      }
    )

    this.auth.getSpecialties().valueChanges().subscribe(
      res => {
        this.specialties = [...res] as Specialty[];
      }
    )

    let date = new Date();

    this.today = {
      'day':date.getDate(),
      'month': date.getMonth()+1,
      'year':date.getFullYear()
    }

    date.setDate(date.getDate() + 15);

    this.max = {
      'day':date.getDate(),
      'month': date.getMonth()+1,
      'year':date.getFullYear()
    }

    this.search();
  }

  ngAfterViewInit(){
    this.stepper = new Stepper(this.stepperRef.nativeElement, {linear: true, animation: true});
  }

  onSlotClicked($event){
    this.selectedSlot = $event != this.selectedSlot ? $event : null;
  }

  translateDay(date: Date){
    let d = date.toLocaleDateString('en-us',{weekday:'long'}).substring(0,2).toLowerCase();
    let v = this.days.find(day => day.value == d);
    return !v ? '' : v.viewValue;
  }

  onRegister(next?: boolean){

    let hour, min, obj;

    if(next){
      hour = this.nextHour.time.substring(0, this.selectedSlot.time.indexOf(':'));
      min = this.nextHour.time.substring(this.selectedSlot.time.indexOf(':')+1);
      this.nextDate.setHours(hour);
      this.nextDate.setMinutes(min);
      this.selectedDate = this.nextDate;
      this.confirmationDate = this.nextDate;
    }else{
      hour = this.selectedSlot.time.substring(0, this.selectedSlot.time.indexOf(':'));
      min = this.selectedSlot.time.substring(this.selectedSlot.time.indexOf(':')+1);
      this.selectedDate.setHours(hour);
      this.selectedDate.setMinutes(min);
    }

    obj = {
      'professional': this.doctorSelected.uid,
      'patient': this.auth.currentUser.uid,
      'status': AppointmentStatus.Pending,
      'review': '',
      'date': next ? this.nextDate  : this.selectedDate
    }

    this.loading = true;

    this.apps.newAppointment(obj).then(res => {
      this.notify.toastNotify('Registro exitoso','El turno fue registrado exitosamente. Puede verlo en su lista de turnos futuros.');
      this.loading = false;
      this.selectedSlot = null;
      this.stepper.next();
    }, err => {
      this.notify.toastNotify('Error registrando turno','Hubo un error registrando el turno. In');
      this.loading = false;
      this.selectedSlot = null;
    });
  }

  onExportConfirmation(){
    this.loadingConfirmation = true;
    this.exportConfirmation('confirmacion-turno');
    this.confirmationExported = true;
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 2000);
  }

  exportConfirmation(filename: string){

    let icon = faStethoscope;
    const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    let html = '<fa-icon type="button"  class="px-3" [icon]="icon" [size]="lg" ngbDropdownToggle></fa-icon>'.concat(document.getElementById('print').innerHTML);

    doc.fromHTML(html, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save(filename + '.pdf');
    this.loadingConfirmation = false;
  }


  search(){
    this.loadingDoctors = true;
    this.apps.getStaffMembers().get().then(ref => {

      ref.docs.forEach(d => {
        if(d.get('schedule')){
          this.doctors.push(d.data() as User);
        }
      })

      this.loadingDoctors = false;
    });
  }

  stepTo(step: number){
    if(step == 1){
      this.stepper.to(1);
    }else if(step == 2 && this.specialtySelected){
      this.stepper.to(2)
    }else if(step == 3 && this.doctorSelected){
      this.stepper.to(3);
    }
  }

  printDays(schedule){
    let s = '';

    for(let d of this.days){
      if(schedule[d.value]){
        s+=' ' + d.viewValue + ' |';
      }
    }

    return s.substring(0, s.length-2);
  }

  onDayClicked(day){

    if(!this.doctorSelected.schedule[day.value]) return;

    this.selectedDay = day == this.selectedDay ? null : day;

    if(this.selectedDay){
      this.selectedDate = new Date();

      while(this.selectedDate.getDay() != this.selectedDay.number){
        this.selectedDate.setDate(this.selectedDate.getDate() + 1);
      }

      while(this.selectedDate.getDate() < new Date().getDate()){
        this.selectedDate.setDate(this.selectedDate.getDate() + 7);
      }
      this.getAvailableHours();
    }
  }

  onDoctorSelected(doctor: User){
    this.doctorSelected = this.doctorSelected == doctor ? null : doctor;
    this.selectedDate = null;
    this.findNextAppointmentSlot(new Date());
    this.stepper.next();
  }

  onSpecialtySelected(label: string){
    this.specialtySelected = label;
    this.doctors = this.doctors.filter(doc => doc.specialties.includes(label));
    this.stepper.next();
  }

  findNextAppointmentSlot(d: Date){

    this.apps.getStaffAppointments(this.doctorSelected.uid).valueChanges().subscribe(
      (ref: Appointment[]) => {
        let temp = [];

        ref.forEach(doc => {
          let date = doc.date.toDate();
          let month = date.getMonth();
          let day = date.getDay();

          if(day == d.getDay() && month == d.getMonth()){
            temp.push(date.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit' }))
          }
        })

        let b = d.toLocaleDateString('en-us',{weekday:'long'}).substring(0,2).toLowerCase();
        let day = this.doctorSelected.schedule[b];
        let from, to, arr, hour;

        if(day){
          from = +(day[0].substring(0, day[0].indexOf(':')));
          to = +(day[1].substring(0, day[1].indexOf(':')));
          arr = [];

          for(let i: number = from ; i < to ; i++){

            let a = i.toString().length == 1 ? '0' + i.toString() : i.toString();

            arr.push({time: a + ':00', available: !temp.includes(a + ':00')});
            if(i != to) arr.push({time: a + ':30', available: !temp.includes(a + ':30')});
          }

          hour =  arr.find(h => h.available);
        }

        if(hour){
          this.nextDate = d;
          this.nextHour = hour;

          this.selectedDate = d;
          this.selectedSlot = hour;
        }else{
          d.setDate(d.getDate() + 1);
          this.findNextAppointmentSlot(d);
        }
      }
    );
  }

  dateSelected(date: NgbDate){

    this.loadingHours = true;
    this.selectedDate = new Date(date.year, date.month - 1, date.day);

    let day = this.selectedDate.toLocaleDateString('en-us',{weekday:'long'}).substring(0,2).toLowerCase();
    this.showHours = this.doctorSelected.schedule[day];

    if(!this.showHours) this.hours = [];

    this.getAvailableHours();
  }

  getAvailableHours(){
    this.loadingHours = true;

    return this.apps.getStaffAppointments(this.doctorSelected.uid).valueChanges().subscribe(
      (ref: Appointment[]) => {

        do{
          let temp = [];

          ref.forEach(doc => {
            let date = doc.date.toDate();
            let month = date.getMonth();
            let day = date.getDay();

            if(day == this.selectedDate.getDay() && month == this.selectedDate.getMonth()){
              temp.push(date.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit' }))
            }
          })

          let b = this.selectedDate.toLocaleDateString('en-us',{weekday:'long'}).substring(0,2).toLowerCase();
          let day = this.doctorSelected.schedule[b];
          let from, to, arr = [];

          if(day){
            from = +(day[0].substring(0, day[0].indexOf(':')));
            to = +(day[1].substring(0, day[1].indexOf(':')));
            arr = [];

            for(let i: number = from ; i < to ; i++){

              let a = i.toString().length == 1 ? '0' + i.toString() : i.toString();

              arr.push({time: a + ':00', available: !temp.includes(a + ':00')});
              if(i != to) arr.push({time: a + ':30', available: !temp.includes(a + ':30')});
            }
          }

          if(arr.some(d => d.available)){
            this.hours = arr;
            this.loadingHours = false;
          }else{
            this.selectedDate.setDate(this.selectedDate.getDate() + 7);
          }
        }while(this.hours == null);

        this.loadingHours = false;

      }
    );
  }
}
