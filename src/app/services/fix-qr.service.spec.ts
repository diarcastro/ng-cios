import { TestBed, inject } from '@angular/core/testing';

import { FixQrService } from './fix-qr.service';

describe('FixQrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FixQrService]
    });
  });

  it('should be created', inject([FixQrService], (service: FixQrService) => {
    expect(service).toBeTruthy();
  }));
});
