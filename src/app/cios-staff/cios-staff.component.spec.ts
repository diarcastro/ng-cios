import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CiosStaffComponent } from './cios-staff.component';

import { UserService } from '../services/user.service';
import { MockUserService } from '../../testing/mock-user.service';
import { HeadquarterService } from '../services/headquarter.service';

import { MockHeadquerterService } from '../../testing/mock-headquarter.service';
import { StaffService } from '../services/staff.service';
import { MockStaffService } from '../../testing/mock-staff.service';

describe('CiosStaffComponent', () => {
  let component: CiosStaffComponent;
  let fixture: ComponentFixture<CiosStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule]
      , declarations: [CiosStaffComponent]
      , schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(CiosStaffComponent, {
        set: {
          providers: [
            { provide: UserService, useClass: MockUserService }
            , { provide: HeadquarterService, useClass: MockHeadquerterService }
            , { provide: StaffService, useClass: MockStaffService }
          ]
        }
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CiosStaffComponent);
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
