import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosStaffComponent } from './cios-staff.component';

describe('CiosStaffComponent', () => {
  let component: CiosStaffComponent;
  let fixture: ComponentFixture<CiosStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiosStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiosStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
