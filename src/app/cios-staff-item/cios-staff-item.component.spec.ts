import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosStaffItemComponent } from './cios-staff-item.component';

describe('CiosStaffItemComponent', () => {
  let component: CiosStaffItemComponent;
  let fixture: ComponentFixture<CiosStaffItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiosStaffItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiosStaffItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
