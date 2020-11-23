import {Days} from './models/staffschedule';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(values: any[], search: string, prop?: string): unknown {

    if(values.length == 0 || !search) return values;

    return values.filter(val => {
      if(prop) return  JSON.stringify(val[prop]).toLowerCase().includes(search);

      if(!prop && JSON.stringify(val).toLowerCase().includes(search)){
        return true;
      }

      return JSON.stringify(val).toLowerCase().includes(search);
    })
  }

}
