import { SpecialtyAddComponent } from './specialty-add/specialty-add.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { StaffApprovalComponent } from './staff-approval/staff-approval.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffScheduleComponent } from './staff-schedule/staff-schedule.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'home/staffapproval', component: StaffApprovalComponent},
  {path: 'home/adminadd', component: AdminAddComponent},
  {path: 'home/specialtyadd', component: SpecialtyAddComponent},
  {path: 'home/staffschedule', component: StaffScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
