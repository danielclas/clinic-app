import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() description: String;
  @Input() label: String;
  @Input() link: String;

  constructor() { }

  ngOnInit(): void {
  }

}
