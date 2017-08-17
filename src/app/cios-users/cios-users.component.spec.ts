import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosUsersComponent } from './cios-users.component';
import { UserService } from '../services/user.service';

import { MockUserService } from '../../testing/mock-user.service';
import { MockUserNoteService } from '../../testing/mock-user-note.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserNoteService } from '../services/user-note.service';

describe('CiosActiveUsersComponent', () => {
  let component: CiosUsersComponent;
  let fixture: ComponentFixture<CiosUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule]
      , declarations: [CiosUsersComponent]
      , schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(CiosUsersComponent, {
        set: {
          providers: [
            { provide: UserService, useClass: MockUserService }
            , { provide: UserNoteService, useClass: MockUserNoteService }
          ]
        }
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CiosUsersComponent);
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
