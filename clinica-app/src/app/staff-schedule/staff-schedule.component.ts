import { Days } from '../models/staffschedule';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
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
  schedule;

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.userAsigned.subscribe(
      (user: User) => {
        this.schedule = this.auth.currentUser.schedule;
      }
    )

    if(this.auth.currentUser){
      this.schedule =  this.auth.currentUser.schedule;
    }
  }

  onActivateClick(day: string, from, to){

    if(this.schedule[day]) delete this.schedule[day];
    else this.schedule[day] = [from.value, to.value];
  }

  compareHours(hour, from){

    if(!from.value) return true;

    let a: number = +(hour.slice(0, hour.indexOf(':')) + hour.slice(hour.indexOf(':')+1));
    let b: number = +(from.value.slice(0, from.value.indexOf(':')) + from.value.slice(from.value.indexOf(':')+1));

    return a > b;
  }

  printHours(day, from = 8){
    let arr = [];
    let to = 19;

    if(day.value == 'sa'){
      to = 14;
    }

    for(let i = from ; i <= to ; i++){
      arr.push(i+':00');
      if(i != to) arr.push(i+':30');
    }

    return arr;
  }

}
