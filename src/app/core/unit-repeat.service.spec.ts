import { TestBed, inject } from '@angular/core/testing';

import { UnitRepeatService } from './unit-repeat.service';

describe('UnitRepeatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnitRepeatService]
    });
  });

  it('should be created', inject([UnitRepeatService], (service: UnitRepeatService) => {
    expect(service).toBeTruthy();
  }));
});
