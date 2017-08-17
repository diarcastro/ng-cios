import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { UserService } from '../services/user.service';
import { Http, HttpModule, ConnectionBackend } from '@angular/http';
import { ServicesRoutes } from '../classes/ServicesRoutes';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule]
      , providers: [AuthGuard, UserService, Http, ConnectionBackend, ServicesRoutes]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
