import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-attend-appointment',
  templateUrl: './attend-appointment.component.html',
  styleUrls: ['./attend-appointment.component.css']
})
export class AttendAppointmentComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
    });
  }

}
