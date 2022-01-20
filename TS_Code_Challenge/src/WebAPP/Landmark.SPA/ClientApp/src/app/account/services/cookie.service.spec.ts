import { TestBed } from '@angular/core/testing';

import { CookieService } from './cookie.service';

describe('CookieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    // tslint:disable-next-line: deprecation
    const service: CookieService = TestBed.get(CookieService);
    expect(service).toBeTruthy();
  });
});
