import { User } from './../../models/user';
import { Component, Input, OnInit } from '@angular/core';
import { UserType } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() description: String;
  @Input() label: String;
  @Input() link: String;

  disabled: boolean = false;

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.userAsigned.subscribe(
      (user: User) => {
        this.disabled = user.type == UserType.Staff ? !user.enabled : false;
      }
    )

    if(this.auth.currentUser){
      this.disabled = this.auth.currentUser.type == UserType.Staff ? !this.auth.currentUser.enabled : false;
    }

  }

}
