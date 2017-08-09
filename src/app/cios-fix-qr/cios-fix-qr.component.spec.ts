import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosFixQrComponent } from './cios-fix-qr.component';

describe('CiosFixQrComponent', () => {
  let component: CiosFixQrComponent;
  let fixture: ComponentFixture<CiosFixQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiosFixQrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiosFixQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
