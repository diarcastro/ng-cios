import { TestBed, inject } from '@angular/core/testing';

import { HeadquarterService } from './headquarter.service';

describe('HeadquarterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeadquarterService]
    });
  });

  it('should be created', inject([HeadquarterService], (service: HeadquarterService) => {
    expect(service).toBeTruthy();
  }));
});
