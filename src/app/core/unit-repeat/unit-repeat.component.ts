import { Component, OnInit } from '@angular/core';
import { UnitStudyService } from '../unit-study.service';
import { unitTrackBy } from '../unit.track-by';
import { UnitRepeatService } from '../unit-repeat.service';
import { MatSelectionListChange } from '@angular/material';

@Component({
  selector: 'app-unit-repeat',
  templateUrl: './unit-repeat.component.html',
  styleUrls: ['./unit-repeat.component.css']
})
export class UnitRepeatComponent implements OnInit {
  units$ = this.unitRepeatService.units$;
  unitTrackBy: (index: any, item: any) => any = unitTrackBy;

  constructor(private unitRepeatService: UnitRepeatService) {}

  ngOnInit() {}

  onSelect(unit) {
    this.unitRepeatService.toggleCheckUnit(unit);
  }
}
