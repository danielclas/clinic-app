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
  {number: 1, value: 'mo', viewValue: 'Lunes', on: false},
  {number: 2, value: 'tu', viewValue: 'Martes', on: false},
  {number: 3, value: 'we', viewValue: 'Miercoles', on: false},
  {number: 4, value: 'th', viewValue: 'Jueves', on: false},
  {number: 5, value: 'fr', viewValue: 'Viernes', on: false},
  {number: 6, value: 'sa', viewValue: 'Sabado', on: false}
]
