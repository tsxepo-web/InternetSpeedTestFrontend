import { TestBed } from '@angular/core/testing';

import { SpeedDataService } from './speed-data.service';

describe('SpeedDataService', () => {
  let service: SpeedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
