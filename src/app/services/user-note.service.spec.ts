import { TestBed, inject } from '@angular/core/testing';

import { UserNoteService } from './user-note.service';

describe('UserNoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserNoteService]
    });
  });

  it('should be created', inject([UserNoteService], (service: UserNoteService) => {
    expect(service).toBeTruthy();
  }));
});
