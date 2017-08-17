import { TestBed, inject } from '@angular/core/testing';

import { UserNoteService } from './user-note.service';
import { HttpModule, Http, ConnectionBackend } from '@angular/http';
import { ServicesRoutes } from '../classes/ServicesRoutes';

describe('UserNoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule]
      , providers: [UserNoteService, Http, ConnectionBackend, ServicesRoutes]
    });
  });

  it('should be created', inject([UserNoteService], (service: UserNoteService) => {
    expect(service).toBeTruthy();
  }));
});
