import { AppointmentsService } from './../../services/appointments.service';
import { Days } from '../../models/staffschedule';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { faCheckCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-staff-schedule',
  templateUrl: './staff-schedule.component.html',
  styleUrls: ['./staff-schedule.component.css']
})
export class StaffScheduleComponent implements OnInit {

  days = Days;
  icon: IconDefinition = faCheckCircle;
  selectors = {};
  toHours = [];
  toHoursSat = [];
  schedule = {};
  loading: boolean = false;

  constructor(private auth: AuthenticationService, private appointments: AppointmentsService) { }

  ngOnInit(): void {
    this.auth.userAsigned.subscribe(
      (user: User) => {
        if(this.auth.currentUser.schedule){
          this.schedule = this.auth.currentUser.schedule;
        }
      }
    )

    if(this.auth.currentUser && this.auth.currentUser.schedule){
      this.schedule =  this.auth.currentUser.schedule;
    }

    this.toHours = this.printHours('mo');
    this.toHoursSat = this.printHours('sa');
  }

  onActivateClick(day: string, from, to){

    if(this.schedule[day]) delete this.schedule[day];
    else this.schedule[day] = [from.value, to.value];

    console.log(this.schedule);
  }

  compareHours(hour, from){

    if(!from.value) return true;

    let a: number = +(hour.slice(0, hour.indexOf(':')) + hour.slice(hour.indexOf(':')+1));
    let b: number;

    if(from.value){
      b = +(from.value.slice(0, from.value.indexOf(':')) + from.value.slice(from.value.indexOf(':')+1));
    }else{
      b = +(from.slice(0, from.indexOf(':')) + from.slice(from.indexOf(':')+1));
    }

    return a > b;
  }

  onHourSelected(day, from, to){
    this.toHours = this.printHours('mo');

    if(this.schedule[day]){
      let temp = this.compareHours(to, from) ? to : this.toHours[this.toHours.indexOf(from) + 1];
      this.schedule[day][0] = from;
      this.schedule[day][1] = temp;
    }
  }

  onUpdateClick(){

    this.loading = true;

    this.appointments.setStaffSchedule(this.schedule).
    add(ref => this.loading = false);
  }

  printHours(day, from = 8){
    let arr = [];
    let to = 19;

    for(let i = from ; i <= to ; i++){
      arr.push(i+':00');
      if(i != to) arr.push(i+':30');
    }

    return arr;
  }

}
