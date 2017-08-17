import { TestBed, inject } from '@angular/core/testing';

import { FixQrService } from './fix-qr.service';
import { HttpModule, Http, ConnectionBackend } from '@angular/http';
import { ServicesRoutes } from '../classes/ServicesRoutes';

describe('FixQrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule]
      , providers: [FixQrService, Http, ConnectionBackend, ServicesRoutes]
    });
  });

  it('should be created', inject([FixQrService], (service: FixQrService) => {
    expect(service).toBeTruthy();
  }));
});
