import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() description: String;
  @Input() label: String;
  @Input() link: String;

  enabled: boolean = false;

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.enabled = this.auth.currentUser.enabled;
  }

}
