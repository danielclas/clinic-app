import { CardsComponent } from './cards/cards.component';
import { NotFoundComponent } from './not-found/not-found.component';
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
  {path: 'home', component: HomeComponent, children: [
    {path: '', component: CardsComponent},
    {path: 'staffapproval', component: StaffApprovalComponent},
    {path: 'adminadd', component: AdminAddComponent},
    {path: 'specialtyadd', component: SpecialtyAddComponent},
    {path: 'staffschedule', component: StaffScheduleComponent},
  ]},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
