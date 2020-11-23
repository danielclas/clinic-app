import { Notification } from './../../models/notification';
import { AnimateGallery } from './../../animations';
import { NotifyService } from './../../services/notify.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faStethoscope, faBell, faDoorOpen, IconDefinition, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [AnimateGallery]
})

export class NavbarComponent implements OnInit {

  cross: IconDefinition = faTimesCircle;
  icon: IconDefinition = faStethoscope;
  alert = faBell;
  exit = faDoorOpen;
  notifications: Notification[] = [];

  constructor(private notify: NotifyService, public auth: AuthenticationService, private router: Router){}

  ngOnInit(): void {
    this.auth.userAsigned.subscribe(res => this.getNotifications());

    if(this.auth.currentUser) this.getNotifications();
  }

  getNotifications(){
    this.notify.getPendingNotifications().valueChanges({idField: 'id'}).subscribe(
      res => {
        this.notifications = [...res] as unknown as Notification[];
        this.notifications = this.notifications.filter(n => !n.seen && n.target == this.auth.currentUser.uid);
      }
    )
  }

  onDismissNotification(item){
    this.notify.dismissNotificacion(item.id);
    this.getNotifications();
  }

  onLogOutClicked(){
    this.auth.SignOut().then(res => this.router.navigateByUrl('/login'));
  }

  onBellClick(bell: HTMLElement){
    if(bell.classList.contains('shake')){
      bell.classList.remove('shake');
    }
  }
}
