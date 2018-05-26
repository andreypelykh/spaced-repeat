import { Component, OnInit } from '@angular/core';
import { UnitStudyService } from '../unit-study.service';
import { unitTrackBy } from '../unit.track-by';

@Component({
  selector: 'app-unit-study',
  templateUrl: './unit-study.component.html',
  styleUrls: ['./unit-study.component.css']
})
export class UnitStudyComponent implements OnInit {
  units$;
  unitTrackBy: (index: any, item: any) => any = unitTrackBy;

  constructor(private unitStudyService: UnitStudyService) {}

  ngOnInit() {
    this.units$ = this.unitStudyService.units;
  }

  addUnit(value) {
    if (!value) {
      return;
    }

    this.unitStudyService.addUnit(value);
  }

  removeUnit(key: string) {
    this.unitStudyService.removeUnit(key);
  }
}
