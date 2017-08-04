import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosUserActiveComponent } from './cios-user-active.component';

describe('CiosUserActiveComponent', () => {
  let component: CiosUserActiveComponent;
  let fixture: ComponentFixture<CiosUserActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiosUserActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiosUserActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
