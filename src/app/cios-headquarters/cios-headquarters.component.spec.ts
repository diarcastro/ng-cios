import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosHeadquartersComponent } from './cios-headquarters.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from '../services/user.service';
import { MockUserService } from '../../testing/mock-user.service';
import { FormsModule } from '@angular/forms';
import { HeadquarterService } from '../services/headquarter.service';
import { MockHeadquerterService } from '../../testing/mock-headquarter.service';

describe('CiosHeadquartersComponent', () => {
  let component: CiosHeadquartersComponent;
  let fixture: ComponentFixture<CiosHeadquartersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule]
      , declarations: [CiosHeadquartersComponent]
      , schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(CiosHeadquartersComponent, {
        set: {
          providers: [
            { provide: UserService, useClass: MockUserService }
            , { provide: HeadquarterService, useClass: MockHeadquerterService }
          ]
        }
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CiosHeadquartersComponent);
        component = fixture.componentInstance;
      });
  }));

  beforeEach(() => {

    // fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
