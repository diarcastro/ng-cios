import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosMenuComponent } from './cios-menu.component';
import { UserService } from '../services/user.service';
import { MockUserService } from '../../testing/mock-user.service';
import { HttpModule } from '@angular/http';

describe('CiosMenuComponent', () => {
  let component: CiosMenuComponent;
  let fixture: ComponentFixture<CiosMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CiosMenuComponent]
      , schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(CiosMenuComponent, {
        set: {
          providers: [
            { provide: UserService, useClass: MockUserService }
          ]
        }
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CiosMenuComponent);
        component = fixture.componentInstance;
        // fixture.detectChanges();
      });
  }));

  // beforeEach(() => {

  // });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
