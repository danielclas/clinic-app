import { AttendAppointmentComponent } from './staff/attend-appointment/attend-appointment.component';
import { PastAppointmentsComponent } from './patient/past-appointments/past-appointments.component';
import { NewAppointmentComponent } from './patient/new-appointment/new-appointment.component';
import { PatientAppointmentsComponent } from './patient/patient-appointments/patient-appointments.component';
import { CardsBoardComponent } from './layout/cards-board/cards-board.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { SpecialtyAddComponent } from './shared/specialty-add/specialty-add.component';
import { AdminAddComponent } from './admin/admin-add/admin-add.component';
import { StaffApprovalComponent } from './admin/staff-approval/staff-approval.component';
import { HomeComponent } from './shared/home/home.component';
import { RegisterComponent } from './shared/register/register.component';
import { LoginComponent } from './shared/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffScheduleComponent } from './staff/staff-schedule/staff-schedule.component';
import { StaffAppointmentsComponent } from './staff/staff-appointments/staff-appointments.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, children: [
    {path: '', component: CardsBoardComponent},
    {path: 'staffapproval', component: StaffApprovalComponent},
    {path: 'adminadd', component: AdminAddComponent},
    {path: 'specialtyadd', component: SpecialtyAddComponent},
    {path: 'staffschedule', component: StaffScheduleComponent},
    {path: 'staffappointments', component: StaffAppointmentsComponent},
    {path: 'patientappointments', component: PatientAppointmentsComponent},
    {path: 'newappointment', component: NewAppointmentComponent},
    {path: 'pastappointments', component: PastAppointmentsComponent},
    {path: 'attendappointment', component: AttendAppointmentComponent}
  ]},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
