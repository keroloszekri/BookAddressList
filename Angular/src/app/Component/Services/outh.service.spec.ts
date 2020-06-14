import { TestBed } from '@angular/core/testing';

import { OuthService } from './outh.service';

describe('OuthService', () => {
  let service: OuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
