import { TranslationService } from 'src/app/translation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.css']
})
export class LanguageSwitchComponent implements OnInit {

  path = '../../../assets/images/';

  constructor(
    public ts: TranslationService
  ) { }

  ngOnInit(): void {
  }

}
