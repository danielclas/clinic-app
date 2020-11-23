export class Notification{

  id?: string;
  date: Date;
  target: String;
  message: String;
  seen: Boolean;

  constructor(date: Date, target: String, message: String, seen = false, id?: string){
    this.date = date;
    this.target = target;
    this.message = message;
    this.seen = seen;
    this.id = id;
  }
}
