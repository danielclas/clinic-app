import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'data'
})
export class DataPipe implements PipeTransform {

  transform(data: {}, props?: any[]) {

    let s = '';

    for(let prop in data){
        s+= this.format(prop) + ': ' + data[prop] + ' | ';
    }

    return s.substring(0, s.length-2);
  }

  format(s: string){

    if(s == 'age') s = 'Edad';
    else if(s == 'bodyTemp') s = 'Temperatura';
    else if (s == 'bloodPressure') s = 'Presión';

    return s[0].toUpperCase() + s.substring(1).toLowerCase();
  }

}
