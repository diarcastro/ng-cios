import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { Http, ConnectionBackend, HttpModule } from '@angular/http';
import { ServicesRoutes } from '../classes/ServicesRoutes';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule]
      , providers: [UserService, Http, ConnectionBackend, ServicesRoutes]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
