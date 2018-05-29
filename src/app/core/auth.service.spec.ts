import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from 'firebase';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { FirebaseAuth } from 'angularfire2';
import { Router } from '@angular/router';

export const userMock = <User>{ uid: '0', displayName: 'Test Name' };

export class AngularFireAuthMock {
  user = new BehaviorSubject(null);
  auth = {
    signInWithPopup: () => {
      this.user.next(userMock);
      return Promise.resolve(userMock);
    },
    signOut: () => {
      this.user.next(null);
      return Promise.resolve();
    }
  };
}

export const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

describe('AuthService', () => {
  let currentUser: User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useClass: AngularFireAuthMock },
        { provide: Router, useValue: routerSpy }
      ]
    });
  });

  beforeEach(() => {
    TestBed.get(AuthService).user.subscribe(user => {
      currentUser = user;
    });
  });

  it(
    'should be created',
    inject([AuthService], (service: AuthService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should not have logged user',
    inject([AuthService], (service: AuthService) => {
      expect(currentUser).toBeNull();
    })
  );

  it(
    'should log user in',
    inject(
      [AuthService],
      fakeAsync((service: AuthService) => {
        service.googleLogin();

        tick();

        expect(currentUser).not.toBeNull();
      })
    )
  );

  it(
    'should log user out',
    inject(
      [AuthService],
      fakeAsync((service: AuthService) => {
        service.logout();

        tick();

        expect(currentUser).toBeNull();
      })
    )
  );
});
