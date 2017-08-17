import { TestBed, inject } from '@angular/core/testing';

import { ReportsService } from './reports.service';
import { HttpModule, Http, ConnectionBackend } from '@angular/http';
import { ServicesRoutes } from '../classes/ServicesRoutes';

describe('ReportsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule]
      , providers: [ReportsService, Http, ConnectionBackend, ServicesRoutes]
    });
  });

  it('should be created', inject([ReportsService], (service: ReportsService) => {
    expect(service).toBeTruthy();
  }));
});
