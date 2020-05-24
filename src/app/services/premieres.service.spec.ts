import { TestBed } from '@angular/core/testing';

import { PremieresService } from './premieres.service';

describe('PremieresService', () => {
  let service: PremieresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PremieresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
