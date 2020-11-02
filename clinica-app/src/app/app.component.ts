import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';
import { faStethoscope, faBell, faDoorOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clinica-app';

  icon = faStethoscope;
  alert = faBell;
  exit = faDoorOpen;

  constructor(public auth: AuthenticationService){}
}
