import { AnimateGallery } from './../../animations';
import { Appointment, AppointmentStatus } from './../../models/appointments';
import { Schedule } from './../../models/staffschedule';
import { AppointmentsService } from './../../services/appointments.service';
import { NotifyService } from './../../services/notify.service';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Days } from '../../models/staffschedule';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import Stepper from 'bs-stepper'

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

  stepper: Stepper;

  nextDate: any;
  nextHour: any;

  specialtyFilter: string;
  doctorFilter: string;
  days = Days;
  selectedDays = [];

  specialties = [];
  specialtySelected;

  doctorSelected: User;
  doctors: User[] = [];

  today: NgbDateStruct;
  max: NgbDateStruct;

  showHours = false;
  hours = [];
  date: {year: number, month: number};
  selectedDate;

  loading = false;
  loadingHours = false;
  loadingDoctors = false;

  selectedSlot;
  constructor(private apps: AppointmentsService, private auth: AuthenticationService, private formBuilder: FormBuilder, private notify: NotifyService) { }

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
    return this.days.find(day => day.value == d);
  }

  onRegister(){

    let hour = this.selectedSlot.time.substring(0, this.selectedSlot.time.indexOf(':'));
    let min = this.selectedSlot.time.substring(this.selectedSlot.time.indexOf(':')+1);

    this.selectedDate.setHours(hour);
    this.selectedDate.setMinutes(min);

    let obj = {
      'professional': this.doctorSelected.uid,
      'patient': this.auth.currentUser.uid,
      'status': AppointmentStatus.Pending,
      'review': '',
      'date': this.selectedDate
    }

    this.loading = true;

    this.apps.newAppointment(obj).then(res => {
      this.notify.toastNotify('Registro exitoso','El turno fue registrado exitosamente. Puede verlo en su lista de turnos futuros.');
      this.loading = false;
      this.selectedSlot = undefined;
      this.findNextAppointmentSlot(new Date());
    }, err => {
      this.notify.toastNotify('Error registrando turno','Hubo un error registrando el turno. In');
      this.loading = false;
      this.selectedSlot = undefined;
    });
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

    day.on = !day.on;

    if(day.on) this.selectedDays.push(day.value);
    else this.selectedDays = this.selectedDays.filter(d => d != day.value);
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
    return this.apps.getStaffAppointments(this.doctorSelected.uid).valueChanges().subscribe(
      (ref: Appointment[]) => {
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
        let from, to, arr;

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

        this.hours = arr;
        this.loadingHours = false;
      }
    );
  }
}
