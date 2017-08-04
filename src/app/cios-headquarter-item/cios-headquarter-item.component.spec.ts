import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosHeadquarterItemComponent } from './cios-headquarter-item.component';

describe('CiosHeadquarterItemComponent', () => {
  let component: CiosHeadquarterItemComponent;
  let fixture: ComponentFixture<CiosHeadquarterItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiosHeadquarterItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiosHeadquarterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
