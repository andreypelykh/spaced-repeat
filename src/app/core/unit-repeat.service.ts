import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { map, filter } from 'rxjs/operators';

export const timeStartMs = (ms: number) => new Date(ms).setHours(0, 0, 0, 0);
export const timeEndMs = (ms: number) => new Date(ms).setHours(23, 59, 59, 999);
export const todayStartMs = () => timeStartMs(Date.now());
export const todayEndMs = () => timeEndMs(Date.now());

@Injectable({
  providedIn: 'root'
})
export class UnitRepeatService {
  units: Observable<any[]>;
  private unitsRef: AngularFireList<any>;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
    this.unitsRef = db.list('units/' + authService.user.uid, ref => {
      return ref.orderByKey();
    });
    this.units = this.unitsRef.snapshotChanges().pipe(
      map(changes =>
        changes
          .map(c => {
            const unit = c.payload.val();
            return {
              key: c.payload.key,
              ...unit,
              checked: unit.time >= todayStartMs() && unit.daysToRepeat > 1
            };
          })
          .filter(unit => {
            // checked || expired & exact repetitions
            console.log(unit);
            return (
              unit.checked ||
              timeStartMs(unit.time) + unit.daysToRepeat * 24 * 3600 * 1000 <=
                todayStartMs()
            );
          })
      )
    );
  }

  toggleCheckUnit(unit) {
    if (unit.time >= todayStartMs() && unit.daysToRepeat > 1) {
      return this.uncheck(unit);
    } else {
      return this.check(unit);
    }
  }

  private check(unit) {
    return this.unitsRef.update(unit.key, {
      text: unit.text,
      time: todayStartMs(),
      daysToRepeat: unit.daysToRepeat + 1
    });
  }

  private uncheck(unit) {
    return this.unitsRef.update(unit.key, {
      text: unit.text,
      time: todayStartMs() - unit.daysToRepeat,
      daysToRepeat: unit.daysToRepeat - 1
    });
  }
}
