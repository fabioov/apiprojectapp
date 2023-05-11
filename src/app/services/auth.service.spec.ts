import { TestBed } from '@angular/core/testing';

import { AuthSpecService } from './auth.spec.service';

describe('AuthSpecService', () => {
  let service: AuthSpecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSpecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
