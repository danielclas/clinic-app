import { LoginComponent } from './shared/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './shared/register/register.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './shared/home/home.component';
import { CardComponent } from './layout/card/card.component';
import { UserCardComponent } from './layout/user-card/user-card.component';
import { StaffApprovalComponent } from './admin/staff-approval/staff-approval.component';
import { AdminAddComponent } from './admin/admin-add/admin-add.component';
import { SpecialtyAddComponent } from './shared/specialty-add/specialty-add.component';
import {AngularBootstrapToastsModule} from 'angular-bootstrap-toasts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { StaffScheduleComponent } from './staff/staff-schedule/staff-schedule.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { BackArrowComponent } from './layout/back-arrow/back-arrow.component';
import { CardsBoardComponent } from './layout/cards-board/cards-board.component';
import { StaffAppointmentsComponent } from './staff/staff-appointments/staff-appointments.component';
import { PatientAppointmentsComponent } from './patient/patient-appointments/patient-appointments.component';
import { NewAppointmentComponent } from './patient/new-appointment/new-appointment.component';
import { HoursTableComponent } from './layout/hours-table/hours-table.component';
import { FilterPipe } from './filter.pipe';
import { PastAppointmentsComponent } from './patient/past-appointments/past-appointments.component';
import { AttendAppointmentComponent } from './staff/attend-appointment/attend-appointment.component';
import { AppointmentComponent } from './staff/appointment/appointment.component';
import { AppointmentDetailsComponent } from './shared/appointment-details/appointment-details.component';
import { DataPipe } from './data.pipe';
import { PatientReviewComponent } from './patient/patient-review/patient-review.component';
import { ReportsComponent } from './shared/reports/reports.component';
import { AppointmentSearchComponent } from './shared/appointment-search/appointment-search.component';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { TranslatePipe } from './translate.pipe';
registerLocaleData(localeEsAr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CardComponent,
    UserCardComponent,
    StaffApprovalComponent,
    AdminAddComponent,
    SpecialtyAddComponent,
    NavbarComponent,
    StaffScheduleComponent,
    NotFoundComponent,
    BackArrowComponent,
    CardsBoardComponent,
    StaffAppointmentsComponent,
    PatientAppointmentsComponent,
    NewAppointmentComponent,
    HoursTableComponent,
    FilterPipe,
    PastAppointmentsComponent,
    AttendAppointmentComponent,
    AppointmentComponent,
    AppointmentDetailsComponent,
    DataPipe,
    PatientReviewComponent,
    ReportsComponent,
    AppointmentSearchComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'clinica-app'),
    AngularFirestoreModule, // Only required for database features
    AngularFireAuthModule, // Only required for auth features,
    AngularFireStorageModule, // Only required for storage features
    AngularBootstrapToastsModule, NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
