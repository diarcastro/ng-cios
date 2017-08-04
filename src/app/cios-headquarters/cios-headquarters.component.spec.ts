import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosHeadquartersComponent } from './cios-headquarters.component';

describe('CiosHeadquartersComponent', () => {
  let component: CiosHeadquartersComponent;
  let fixture: ComponentFixture<CiosHeadquartersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiosHeadquartersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiosHeadquartersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
