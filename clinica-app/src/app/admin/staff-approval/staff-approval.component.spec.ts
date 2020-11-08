import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffApprovalComponent } from './staff-approval.component';

describe('StaffApprovalComponent', () => {
  let component: StaffApprovalComponent;
  let fixture: ComponentFixture<StaffApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
