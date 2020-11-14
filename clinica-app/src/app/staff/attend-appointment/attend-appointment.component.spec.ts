import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendAppointmentComponent } from './attend-appointment.component';

describe('AttendAppointmentComponent', () => {
  let component: AttendAppointmentComponent;
  let fixture: ComponentFixture<AttendAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
