export class Schedule{

  workingDays: WorkingDay[];

  constructor(){}
}

export class WorkingDay{

  on: boolean;
  hours: number[];
  day: string;

  constructor(){}
}

export const Days = [
  {value: 'mo', viewValue: 'Lunes', on: false},
  {value: 'tu', viewValue: 'Martes', on: false},
  {value: 'we', viewValue: 'Miercoles', on: false},
  {value: 'th', viewValue: 'Jueves', on: false},
  {value: 'fr', viewValue: 'Viernes', on: false},
  {value: 'sa', viewValue: 'Sabado', on: false}
]
