import { TranslationService } from 'src/app/translation.service';
import { ReportsService } from './../../services/reports.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotifyService } from 'src/app/services/notify.service';
import { AnimateGallery } from 'src/app/animations';
import { Appointment } from 'src/app/models/appointments';
import {Days} from 'src/app/models/staffschedule';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  animations: [AnimateGallery]
})
export class ReportsComponent implements OnInit {

  keys: string[];
  values: any[];

  form: FormGroup;
  loadingFirst = false;
  loadingSecond = false;
  loadingThird = false;

  constructor(
    public ts: TranslationService,
    private apps: AppointmentsService,
    private formBuilder: FormBuilder,
    private reports: ReportsService) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      staff: ['']
    });
  }

  exportAsPDF(filename: string){
    const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    doc.fromHTML(this.makeTable(), 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save(filename + '.pdf');
  }

  makeTable(){
    let table =
    `<h2>Clínica online</h2>
      <table class="table table-striped">
        <thead>
          <tr>`;

    this.keys.forEach(key => table += `<th scope="col">${key}</th>`);

    table +=
      ` </tr>
       </thead>
       <tbody>`;

    this.values.forEach(val => {
      table += '<tr>';

      this.keys.forEach(key => {
        table += `<td> ${val[key]}</td>`;
      });

      table += '</tr>';
    });

    table +=
    `</tbody>
      </table>`;

    return table;
  }

  downloadReport(type: string) {

    if(type == 'sp'){
      this.loadingSecond = true;
      this.reports.getSpecialtiesLog().subscribe(
        res => {
          let map = new Map<String, number>();
          let data = [];

          res.docs.forEach(
            doc => {
              let label = doc.get('label');

              if(map.has(label)) map.set(label, map.get(label) + 1);
              else map.set(label, 1);
            }
          )

          map.forEach((val, key) => {
            data.push({
              'Especialidad': key,
              'Turnos registrados': val
            });
          });

          this.keys = ['Especialidad','Turnos registrados'];
          this.values = data;

          let filename = 'Reportes Especialidades ' + new Date().toDateString();

          this.reports.exportAsExcelFile(data, filename);
          this.exportAsPDF(filename);

          this.loadingSecond = false;
        }
      )
    }else if(type == 'log'){
      this.loadingFirst = true;
      this.reports.getSignUpLog().subscribe(
        res => {
          let data = [];

          res.docs.forEach(
            doc => {
              let user = doc.get('userName');
              let arr: any[] = doc.get('entries');

              arr.forEach(val => {
                data.push({
                  'Usuario':user,
                  'Fecha de logeo':val.toDate().toLocaleString()
                })
              })
            }
          )

          this.keys = ['Usuario','Fecha de logeo'];
          this.values = data;

          let filename = 'Reportes Logeo ' + new Date().toDateString();

          this.reports.exportAsExcelFile(data, filename);
          this.exportAsPDF(filename);

          this.loadingFirst = false;
        }
      )
    }else if(type == 'wk'){
      this.loadingThird = true;
      this.apps.getAllAppointments().get().subscribe(
        docs => {
          let arr: Appointment[] = [];
          let dates: Date[] = [];
          let map = new Map<String, number>();
          let data = [];

          docs.forEach(a => arr.push(a.data() as Appointment));
          arr.forEach(a => dates.push(a.date.toDate()));

          dates.forEach(d => {

            let day = Days.find(k => k.number == d.getDay());

            if(day){
              if(map.has(day.viewValue))
                map.set(day.viewValue, map.get(day.viewValue) +1);
              else
                map.set(day.viewValue, 1);
            }
          })

          map.forEach((val, key) => {
            data.push({
              'Día de la semana': key,
              'Turnos registrados': val
            });
          });

          this.keys = ['Día de la semana', 'Turnos registrados'];
          this.values = data;

          let filename = 'Reportes Día de semana ' + new Date().toDateString();

          this.reports.exportAsExcelFile(data, filename);
          this.exportAsPDF(filename);

          this.loadingThird = false;
        }
      )
    }
  }

}
