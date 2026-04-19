import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { dealerGuard } from './dealer-guard';

describe('dealerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => dealerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
