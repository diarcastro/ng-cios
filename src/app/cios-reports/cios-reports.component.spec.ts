import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosReportsComponent } from './cios-reports.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from '../services/user.service';

import { MockUserService } from '../../testing/mock-user.service';
import { FormsModule } from '@angular/forms';
import { DateFormatPipe } from '../pipes/date-format.pipe';
import { ReportsService } from '../services/reports.service';
import { MockReportsService } from '../../testing/mock-reports.service';
import { ServicesRoutes } from '../classes/ServicesRoutes';

describe('CiosReportsComponent', () => {
  let component: CiosReportsComponent;
  let fixture: ComponentFixture<CiosReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule]
      , declarations: [CiosReportsComponent, DateFormatPipe]
      , schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(CiosReportsComponent, {
        set: {
          providers: [
            ServicesRoutes
            , { provide: UserService, useClass: MockUserService }
            , { provide: ReportsService, useClass: MockReportsService }
          ]
        }
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CiosReportsComponent);
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
