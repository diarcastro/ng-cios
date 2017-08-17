import { TestBed, inject } from '@angular/core/testing';

import { HeadquarterService } from './headquarter.service';
import { HttpModule, ConnectionBackend, Http } from '@angular/http';
import { ServicesRoutes } from '../classes/ServicesRoutes';

describe('HeadquarterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule]
      , providers: [HeadquarterService, Http, ConnectionBackend, ServicesRoutes]
    });
  });

  it('should be created', inject([HeadquarterService], (service: HeadquarterService) => {
    expect(service).toBeTruthy();
  }));
});
