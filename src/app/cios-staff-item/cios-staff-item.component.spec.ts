import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosStaffItemComponent } from './cios-staff-item.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StaffService } from '../services/staff.service';
import { MockStaffService } from '../../testing/mock-staff.service';
import { DateFormatPipe } from '../pipes/date-format.pipe';

describe('CiosStaffItemComponent', () => {
  let component: CiosStaffItemComponent;
  let fixture: ComponentFixture<CiosStaffItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CiosStaffItemComponent, DateFormatPipe]
      ,
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(CiosStaffItemComponent, {
        set: {
          providers: [
            { provide: StaffService, useClass: MockStaffService }
          ]
        }
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CiosStaffItemComponent);
        component = fixture.componentInstance;
      });
  }));

  // beforeEach(() => {
  //   fixture.detectChanges();
  // });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
