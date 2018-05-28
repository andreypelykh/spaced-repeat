import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { map, filter, tap, switchMap } from 'rxjs/operators';
import { TODAY_START_MS, TODAY_END_MS, timeStartMs } from './time.uitils';

@Injectable({
  providedIn: 'root'
})
export class UnitRepeatService {
  private unitsRef: AngularFireList<any>;
  units$ = this.authService.user.pipe(
    filter(user => Boolean(user)),
    map(user => user.uid),
    map(uid => this.db.list(`units/${uid}`, ref => ref.orderByKey())),
    tap(ref => (this.unitsRef = ref)),
    switchMap(ref => ref.snapshotChanges()),
    map(changes =>
      changes
        .map(c => {
          const unit: any = c.payload.val();
          return {
            key: c.payload.key,
            ...unit,
            checked: unit.time >= this.todayStartMs() && unit.daysToRepeat > 1
          };
        })
        .filter(unit => {
          // checked || expired & exact repetitions
          console.log(unit);
          return (
            unit.checked ||
            timeStartMs(unit.time) + unit.daysToRepeat * 24 * 3600 * 1000 <=
              this.todayStartMs()
          );
        })
    )
  );

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    @Inject(TODAY_START_MS) private todayStartMs,
    @Inject(TODAY_END_MS) private todayEndMs
  ) {}

  toggleCheckUnit(unit) {
    if (unit.checked) {
      return this.uncheck(unit);
    } else {
      return this.check(unit);
    }
  }

  private check(unit) {
    return this.unitsRef.update(unit.key, {
      text: unit.text,
      time: this.todayStartMs(),
      daysToRepeat: unit.daysToRepeat + 1
    });
  }

  private uncheck(unit) {
    return this.unitsRef.update(unit.key, {
      text: unit.text,
      time: this.todayStartMs() - unit.daysToRepeat,
      daysToRepeat: unit.daysToRepeat - 1
    });
  }
}
