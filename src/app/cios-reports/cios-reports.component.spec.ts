import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosReportsComponent } from './cios-reports.component';

describe('CiosReportsComponent', () => {
  let component: CiosReportsComponent;
  let fixture: ComponentFixture<CiosReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiosReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiosReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
