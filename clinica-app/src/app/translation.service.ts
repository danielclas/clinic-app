import { Injectable } from '@angular/core';
import {spanish, english, portuguese} from './translations';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  languages = ['sp', 'en', 'po'];
  languageSelected = 'sp';
  index = 0;

  constructor() { }

  translate(value: string): string {

    let text = '';

    switch(this.languageSelected){
      case 'sp':
        text = spanish[value];
        break;
      case 'en':
        text = english[value];
        break;
      case 'po':
        text = portuguese[value];
        break;
    }

    return text;
  }

  get selected() { return this.languageSelected;}

  switchLanguages(){
    this.index = this.index == 2 ? 0 : this.index + 1;

    this.languageSelected = this.languages[this.index];
  }
}
