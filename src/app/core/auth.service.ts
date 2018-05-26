import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  googleLogin() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(() => {
      this.router.navigate(['/']);
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => this.router.navigate(['/login']));
  }

  get authenticated() {
    return this.afAuth.user.pipe(map(user => user != null));
  }

  get user() {
    return this.afAuth.user;
  }
}
