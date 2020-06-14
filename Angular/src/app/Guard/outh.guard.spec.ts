import { TestBed } from '@angular/core/testing';

import { OuthGuard } from './outh.guard';

describe('OuthGuard', () => {
  let guard: OuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
