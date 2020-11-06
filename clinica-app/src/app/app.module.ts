import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './layout/card/card.component';
import { UserCardComponent } from './layout/user-card/user-card.component';
import { StaffApprovalComponent } from './staff-approval/staff-approval.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { SpecialtyAddComponent } from './specialty-add/specialty-add.component';
import {AngularBootstrapToastsModule} from 'angular-bootstrap-toasts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { StaffScheduleComponent } from './staff-schedule/staff-schedule.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { CardsComponent } from './layout/cards/cards.component';
import { BackArrowComponent } from './layout/back-arrow/back-arrow.component';

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
    CardsComponent,
    BackArrowComponent
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
