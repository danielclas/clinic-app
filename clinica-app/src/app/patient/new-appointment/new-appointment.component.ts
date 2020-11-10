import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent implements OnInit {

  specialties = [];
  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.getSpecialties().snapshotChanges().subscribe(
      ref => {
        this.specialties = [];
        ref.forEach(d => this.specialties.push(d.payload.doc.get('label')));
      }
    )
  }

}
