import { TestBed } from '@angular/core/testing';

import { CabServiceService } from './cab-service.service';

describe('CabServiceService', () => {
  let service: CabServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CabServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
