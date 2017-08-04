import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosUsersComponent } from './cios-users.component';

describe('CiosActiveUsersComponent', () => {
  let component: CiosUsersComponent;
  let fixture: ComponentFixture<CiosUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CiosUsersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiosUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
