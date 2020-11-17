import { ReportsService } from './../../services/reports.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  form: FormGroup;
  loadingFirst = false;
  loadingSecond = false;

  constructor(
    private apps: AppointmentsService,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private notify: NotifyService,
    private reports: ReportsService) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      staff: ['']
    });
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

          this.reports.exportAsExcelFile(data, 'Reportes Especialidades ' + new Date().toDateString());
          this.loadingSecond = false;
        }
      )
    }else{
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

          this.reports.exportAsExcelFile(data, 'Reportes Logeo ' + new Date().toDateString());
          this.loadingFirst = false;
        }
      )
    }
  }

}
