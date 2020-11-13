import { AppointmentStatus } from './../../models/appointments';
import { Schedule } from './../../models/staffschedule';
import { AppointmentsService } from './../../services/appointments.service';
import { NotifyService } from './../../services/notify.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Days } from '../../models/staffschedule';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent implements OnInit {

  form: FormGroup;

  days = Days;
  selectedDays = [];

  specialties = [];
  specialtySelected;

  doctorSelected;
  doctors = [];

  model: NgbDateStruct;
  today: NgbDateStruct;
  max: NgbDateStruct;

  showHours = false;
  hours = [];
  date: {year: number, month: number};
  selectedDate;

  loading = false;

  selectedSlot;
  constructor(private apps: AppointmentsService, private auth: AuthenticationService, private formBuilder: FormBuilder, private notify: NotifyService) { }

  ngOnInit(): void {
    this.auth.getSpecialties().snapshotChanges().subscribe(
      ref => {
        this.specialties = [];
        ref.forEach(d => this.specialties.push(d.payload.doc.get('label')));
      }
    )

    this.form = this.formBuilder.group({
      staff: [''],
      specialty: ['']
    });

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

  get staff() { return this.form.get('staff'); }

  onSlotClicked($event){
    if($event != this.selectedSlot){
      this.selectedSlot = $event;
    }else{
      this.selectedSlot = undefined;
    }
  }

  onRegister(){

    let hour = this.selectedSlot.time.substring(0, this.selectedSlot.time.indexOf(':'));
    let min = this.selectedSlot.time.substring(this.selectedSlot.time.indexOf(':')+1);

    this.selectedDate.setHours(hour);
    this.selectedDate.setMinutes(min);

    let professional = this.doctorSelected.uid;
    let patient = this.auth.currentUser.uid;
    let status = AppointmentStatus.Pending;
    let review = '';

    let obj = {
      'professional':professional,
      'patient':patient,
      'status':status,
      'review':review,
      'date':this.selectedDate
    }


    this.loading = true;
    this.apps.newAppointment(obj).then(res => {
      this.notify.toastNotify('Registro exitiso','El turno fue registrado exitosamente. Puede verlo en su lista de turnos futuros.');
      this.loading = false;
      this.selectedDate = undefined;
      this.selectedSlot = undefined;
    }, err => {
      this.notify.toastNotify('Error registrando turno','Hubo un error registrando el turno. In');
      this.loading = false;
      this.selectedDate = undefined;
      this.selectedSlot = undefined;
    });
  }

  search(){
    this.apps.getStaffMembers().get().then(ref => {
      let temp = [];
      ref.docs.forEach(doc => {


        if(doc.get('schedule')){
          let obj = {
            'uid': doc.get('uid'),
            'name': doc.get('name') + ' ' + doc.get('surname'),
            'specialties': doc.get('specialties'),
            'schedule': doc.get('schedule'),
          }

          temp.push(obj);
        }
      });

      this.doctors = temp;
    });
  }

  onDayClicked(day){
    day.on = !day.on;

    let temp = [];
    this.doctors.forEach(d => {
      if(day.on){
        if(d.schedule[day.value]){

        }
      }else{

      }
    })
  }

  onDoctorSelected(doctor){
    if(this.doctorSelected == doctor){ this.doctorSelected = undefined; this.selectedDate = undefined;}
    else this.doctorSelected = doctor;
  }

  onSpecialtySelected(select){
    this.specialtySelected = select.value;
  }

  dateSelected(date: NgbDate){

    let a = new Date();
    a.setDate(date.day);
    a.setMonth(date.month-1);
    a.setFullYear(date.year);

    this.selectedDate = a;

    let b = a.toLocaleDateString('en-us',{weekday:'long'}).substring(0,2).toLowerCase();

    if(this.doctorSelected.schedule[b]){
      this.showHours = true;
    }else{
      this.showHours = false;
      this.hours = [];
    }

    this.getAvailableHours();
  }

  getAvailableHours(){
    this.apps.getStaffAppointments(this.doctorSelected.uid).get().subscribe(
      ref => {
        let temp = [];

        ref.forEach(doc => {
          let date = doc.get('date').toDate();
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

          for(let i = from ; i < to ; i++){
            arr.push({time:i+':00',available:!temp.includes(i+':00')});
            if(i != to) arr.push({time:i+':30',available:!temp.includes(i+':30')});
          }
        }

        this.hours = arr;
      }
    );
  }
}
