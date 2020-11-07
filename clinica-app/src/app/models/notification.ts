export class Notification{

  date: Date;
  target: String;
  message: String;
  sent: Boolean;

  constructor(date, target, message, sent = false){
    this.date = date;
    this.target = target;
    this.message = message;
    this.sent = sent;
  }
}
