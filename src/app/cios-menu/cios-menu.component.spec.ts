import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosMenuComponent } from './cios-menu.component';

describe('CiosMenuComponent', () => {
  let component: CiosMenuComponent;
  let fixture: ComponentFixture<CiosMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiosMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiosMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
