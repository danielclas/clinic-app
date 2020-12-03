import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-hours-table',
  templateUrl: './hours-table.component.html',
  styleUrls: ['./hours-table.component.css']
})
export class HoursTableComponent implements OnInit, OnChanges {

  @Input() hours = [];
  @Output() hourClicked = new EventEmitter<string>();

  tableHours = [];
  selectedHour;

  constructor() { }

  ngOnInit(): void {
    this.makeTable();
  }

  ngOnChanges(){
    this.makeTable();
  }

  onHourClicked($event){
    if($event == this.selectedHour){
      this.selectedHour = undefined;
      return;
    }

    if($event.available){
      this.selectedHour = $event;
      this.hourClicked.emit($event);
    }
  }

  makeTable(){

    let lower = 0;
    let upper = 4;
    let arr = [];

    do{

      if(upper+1-lower<this.hours.length){
        arr.push(this.hours.slice(lower, upper))
      }else{
        arr.push(this.hours.slice(lower));
      }

      lower+=4;
      upper+=4;
    }while(arr.length != this.hours.length);

    for(let h of arr){
      let a = [];
      for(let k of h){
        if(!this.tableHours.find(t => t.includes(k))){
          a.push(k)
        }
      }
      this.tableHours.push(a);
    }
  }


}
