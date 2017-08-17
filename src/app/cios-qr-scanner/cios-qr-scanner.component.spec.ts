import { NO_ERRORS_SCHEMA } from '@angular/core';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosQrScannerComponent } from './cios-qr-scanner.component';
import { UserService } from '../services/user.service';
import { MockUserService } from '../../testing/mock-user.service';
import { UserNoteService } from '../services/user-note.service';
import { MockUserNoteService } from '../../testing/mock-user-note.service';

describe('QrScannerComponent', () => {
  let component: CiosQrScannerComponent;
  let fixture: ComponentFixture<CiosQrScannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CiosQrScannerComponent]
      , schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(CiosQrScannerComponent, {
        set: {
          providers: [
            { provide: UserService, useClass: MockUserService }
            , { provide: UserNoteService, useClass: MockUserNoteService }
          ]
        }
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CiosQrScannerComponent);
        component = fixture.componentInstance;
        // fixture.detectChanges();
      })

      ;
  }));

  // beforeEach(() => {

  // });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
