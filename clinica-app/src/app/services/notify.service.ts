import { AngularBootstrapToastsService } from 'angular-bootstrap-toasts';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  options = {
    showProgressLine: true,
    pauseDurationOnMouseEnter: true,
    bodyClass: 'toastText',
    duration: 5000
  }

  constructor(private toast: AngularBootstrapToastsService) { }

  notify(title: string, text: string){
    this.toast.showSimpleToast({title, text, ...this.options});
  }
}
