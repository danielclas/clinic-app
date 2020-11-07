import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAppointmentsComponent } from './staff-appointments.component';

describe('StaffAppointmentsComponent', () => {
  let component: StaffAppointmentsComponent;
  let fixture: ComponentFixture<StaffAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
