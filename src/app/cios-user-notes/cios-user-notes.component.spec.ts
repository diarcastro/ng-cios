import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosUserNotesComponent } from './cios-user-notes.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserNoteService } from '../services/user-note.service';
import { MockUserNoteService } from '../../testing/mock-user-note.service';
import { DateFormatPipe } from '../pipes/date-format.pipe';

describe('CiosUserNotesComponent', () => {
  let component: CiosUserNotesComponent;
  let fixture: ComponentFixture<CiosUserNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CiosUserNotesComponent, DateFormatPipe]
      , schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(CiosUserNotesComponent, {
        set: {
          providers: [
            { provide: UserNoteService, useClass: MockUserNoteService }
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiosUserNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
