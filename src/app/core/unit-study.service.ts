import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireAction
} from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, switchMap, flatMap, tap, filter } from 'rxjs/operators';
import { todayStartMs } from './time.uitils';

@Injectable({
  providedIn: 'root'
})
export class UnitStudyService {
  unitsRef: AngularFireList<{}> = null;
  units$ = this.authService.user.pipe(
    filter(user => Boolean(user)),
    map(user => user.uid),
    map(uid =>
      this.db.list(`units/${uid}`, ref =>
        ref.orderByChild('time').startAt(todayStartMs())
      )
    ),
    tap(ref => (this.unitsRef = ref)),
    switchMap(ref => ref.snapshotChanges()),
    map(changes =>
      changes
        .map(c => ({ key: c.payload.key, ...c.payload.val() }))
        .filter((u: any) => u.daysToRepeat == 1)
    )
  );

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

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
