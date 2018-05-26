import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireAction
} from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnitStudyService {
  units: Observable<any[]>;
  private unitsRef: AngularFireList<{}>;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
    this.authService.user.pipe(map(user => user.uid)).subscribe(uid => {
      this.unitsRef = db.list(`units/${uid}`, ref => {
        const todayStartMs = new Date().setHours(0, 0, 0, 0);

        return ref.orderByChild('time').startAt(todayStartMs);
      });

      this.units = this.unitsRef
        .snapshotChanges()
        .pipe(
          map(changes =>
            changes
              .map(c => ({ key: c.payload.key, ...c.payload.val() }))
              .filter((u: any) => u.daysToRepeat == 1)
          )
        );
    });
  }

  addUnit(text: string) {
    return this.unitsRef.push({
      daysToRepeat: 1,
      text,
      time: Date.now()
    });
  }

  removeUnit(key: string) {
    return this.unitsRef.remove(key);
  }
}
