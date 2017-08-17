import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CiosHeaderComponent } from './cios-header.component';
import { UserService } from '../services/user.service';
import { MockUserService } from '../../testing/mock-user.service';

describe('CiosHeaderComponent', () => {
  let component: CiosHeaderComponent;
  let fixture: ComponentFixture<CiosHeaderComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [CiosHeaderComponent]
      , schemas: [NO_ERRORS_SCHEMA]
      , providers: [
        { provide: UserService, useClass: MockUserService }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CiosHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        de = fixture.debugElement;
        el = de.nativeElement;
      })
      ;
  }));


  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have username', () => {
    const userDiv: HTMLElement = de.query(By.css('.header__user_info__name')).nativeElement;
    expect(userDiv).toBeTruthy();
    expect(userDiv.textContent).toContain(MockUserService.USERNAME);
  });

  it('should have headquarter name', () => {
    const userDiv: HTMLElement = de.query(By.css('.header__user_info__headquarter')).nativeElement;
    expect(userDiv).toBeTruthy();
    expect(userDiv.textContent).toContain(MockUserService.FAKE_HEADQUARTER);
  });
});
