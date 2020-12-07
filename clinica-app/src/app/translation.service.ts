import { Injectable } from '@angular/core';
import {spanish, english, portuguese} from './translations';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  languages = ['sp', 'en'];
  languageSelected = 'sp';
  index = 0;
  constructor() { }

  translate(value: string): unknown {

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

  switchLanguages(){
    this.index = this.index == 1 ? 0 : this.index + 1;

    this.languageSelected = this.languages[this.index];
  }
}
