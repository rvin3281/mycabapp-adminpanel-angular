import { TestBed } from '@angular/core/testing';

import { TravelserviceService } from './travelservice.service';

describe('TravelserviceService', () => {
  let service: TravelserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
