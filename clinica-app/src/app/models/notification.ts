export class Notification{

  date: Date;
  target: String;
  message: String;
  seen: Boolean;

  constructor(date, target, message, seen = false){
    this.date = date;
    this.target = target;
    this.message = message;
    this.seen = seen;
  }
}