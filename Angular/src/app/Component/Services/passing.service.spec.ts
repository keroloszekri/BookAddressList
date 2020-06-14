import { TestBed } from '@angular/core/testing';

import { PassingService } from './passing.service';

describe('PassingService', () => {
  let service: PassingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
