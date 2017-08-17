import { NO_ERRORS_SCHEMA } from '@angular/core';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosFixQrComponent } from './cios-fix-qr.component';
import { UserService } from '../services/user.service';
import { MockUserService } from '../../testing/mock-user.service';
import { FixQrService } from '../services/fix-qr.service';
import { MockFixQrService } from '../../testing/mock-fix-qr.service';

describe('CiosFixQrComponent', () => {
  let component: CiosFixQrComponent;
  let fixture: ComponentFixture<CiosFixQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CiosFixQrComponent]
      , schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(CiosFixQrComponent, {
        set: {
          providers: [
            { provide: UserService, useClass: MockUserService }
            , { provide: FixQrService, useClass: MockFixQrService }
          ]
        }
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CiosFixQrComponent);
        component = fixture.componentInstance;
      })
      ;
  }));

  beforeEach(() => {
    // fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
