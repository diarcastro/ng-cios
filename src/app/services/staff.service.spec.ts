import { TestBed, inject } from '@angular/core/testing';

import { StaffService } from './staff.service';
import { HttpModule, Http, ConnectionBackend } from '@angular/http';
import { ServicesRoutes } from '../classes/ServicesRoutes';

describe('StaffService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule]
      , providers: [StaffService, Http, ConnectionBackend, ServicesRoutes]
    });
  });

  it('should be created', inject([StaffService], (service: StaffService) => {
    expect(service).toBeTruthy();
  }));
});
