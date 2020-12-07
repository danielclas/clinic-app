import { Pipe, PipeTransform } from '@angular/core';
import {spanish, english, portuguese} from './translations';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(value: string, language: string): unknown {

    if(!value || !language) '';

    let text = '';
    switch(language){
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

}
