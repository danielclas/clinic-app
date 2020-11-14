import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotifyService } from 'src/app/services/notify.service';
import { faTimesCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  icon: IconDefinition = faTimesCircle;
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private notify: NotifyService,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      review: [''],
      firstKey: [''],
      firstValue: [''],
      secondKey: [''],
      secondValue: [''],
      thirdKey: [''],
      thirdValue: [''],
    })
  }
}
