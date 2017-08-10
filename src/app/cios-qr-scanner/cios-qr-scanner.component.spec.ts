import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiosQrScannerComponent } from './cios-qr-scanner.component';

describe('QrScannerComponent', () => {
  let component: CiosQrScannerComponent;
  let fixture: ComponentFixture<CiosQrScannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CiosQrScannerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiosQrScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
