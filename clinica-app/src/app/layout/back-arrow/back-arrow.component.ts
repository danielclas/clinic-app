import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faArrowLeft, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-back-arrow',
  templateUrl: './back-arrow.component.html',
  styleUrls: ['./back-arrow.component.css']
})
export class BackArrowComponent implements OnInit {

  icon: IconDefinition = faArrowLeft;
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
