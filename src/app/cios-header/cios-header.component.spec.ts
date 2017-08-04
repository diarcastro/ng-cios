import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosHeaderComponent } from './cios-header.component';

describe('CiosHeaderComponent', () => {
  let component: CiosHeaderComponent;
  let fixture: ComponentFixture<CiosHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiosHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiosHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
