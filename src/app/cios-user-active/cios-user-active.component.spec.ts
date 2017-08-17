import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosUserActiveComponent } from './cios-user-active.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DateFormatPipe } from '../pipes/date-format.pipe';
import { UserService } from '../services/user.service';
import { MockUserService } from '../../testing/mock-user.service';

describe('CiosUserActiveComponent', () => {
  let component: CiosUserActiveComponent;
  let fixture: ComponentFixture<CiosUserActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CiosUserActiveComponent, DateFormatPipe]
      , schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(CiosUserActiveComponent, {
        set: {
          providers: [
            { provide: UserService, useClass: MockUserService }
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiosUserActiveComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
