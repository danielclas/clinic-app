import {Days} from './models/staffschedule';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], name: string, specialty: string, day: any): unknown {

    if(value.length == 0 || (!name && !specialty && !day)) return value;

    if(day){
      day = Days.find(d => d.viewValue == day).value;
    }

    return value.filter(
      (item) => {
        if(name && !item['name'].toLowerCase().includes(name.toLowerCase())){
          return false;
        }

        if(specialty && !item['specialties'].includes(specialty)){
          return false;
        }

        if(day && !item['schedule'][day] != undefined){
          return false;
        }

        return true;
      }
    )
  }

}
