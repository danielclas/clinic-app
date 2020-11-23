import { AnimateGallery } from './../../animations';
import { User } from './../../models/user';
import { Component, Input, OnInit } from '@angular/core';
import { UserType } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [AnimateGallery]
})
export class CardComponent implements OnInit {

  @Input() description: String;
  @Input() label: String;
  @Input() link: String;

  disabled: boolean = false;
  state = '';

  constructor(
    private auth: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.auth.userAsigned.subscribe(
      (user: User) => {
        this.disabled = user.type == UserType.Staff || user.type == UserType.Patient ? !user.enabled : false;
      }
    )

    if(this.auth.currentUser){
      this.disabled = this.auth.currentUser.type == UserType.Staff || this.auth.currentUser.type == UserType.Patient  ? !this.auth.currentUser.enabled : false;
    }
  }

  navigate(){
    this.state = 'buzz';
    setTimeout(() => {
      this.router.navigateByUrl(this.link as string);
    }, 500);
  }
}
