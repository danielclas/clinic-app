import { NotifyService } from './../../services/notify.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faStethoscope, faBell, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  icon = faStethoscope;
  alert = faBell;
  exit = faDoorOpen;
  notifications = [];

  constructor(private notify: NotifyService, public auth: AuthenticationService, private router: Router){}

  ngOnInit(): void {
    this.auth.userAsigned.subscribe(res => this.getNotifications());

    if(this.auth.currentUser) this.getNotifications();
  }

  getNotifications(){
    this.notify.getPendingNotifications().snapshotChanges()
    .subscribe(
      docs => {
        this.notifications = [];
        docs.forEach(d => {
          let doc = d.payload.doc;

          if(!doc.get('seen') && doc.get('target') == this.auth.currentUser.uid){
            this.notifications.push({'id':doc.id, 'message':doc.get('message')});
          }
        });
      }
    )
  }

  onDismissNotification(item){
    this.notify.dismissNotificacion(item.id);
  }

  onLogOutClicked(){
    this.auth.SignOut().then(res => this.router.navigateByUrl('/login'));
  }

}
