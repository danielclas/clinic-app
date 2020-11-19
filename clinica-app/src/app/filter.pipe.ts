import {Days} from './models/staffschedule';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: any[], name: string, specialty: string, day: any): unknown {

    if(values.length == 0 || (!name && !specialty && !day)) return values;
    if(name && !specialty && !day) return this.singleFilter(values, name);

    if(day){
      day = Days.find(d => d.viewValue == day).value;
    }


    return values.filter(
      (item) => {
        if(name && !item['name'].toLowerCase().includes(name.toLowerCase())){
          return false;
        }

        if(specialty && !item['specialties'].includes(specialty)){
          return false;
        }

        if(day && !item['schedule'][day]){
          return false;
        }

        return true;
      }
    )
  }

  singleFilter(values: any[], search: string){

    return values.filter(
      item => { return JSON.stringify(item).toLowerCase().includes(search.toLowerCase());  }
    )
  }

}
