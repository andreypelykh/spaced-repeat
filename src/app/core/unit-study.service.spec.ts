import { TestBed, inject } from '@angular/core/testing';

import { UnitStudyService } from './unit-study.service';

describe('UnitStudyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnitStudyService]
    });
  });

  it(
    'should be created',
    inject([UnitStudyService], (service: UnitStudyService) => {
      expect(service).toBeTruthy();
    })
  );
});
