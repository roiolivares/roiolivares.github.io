import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  constructor(private auth: AngularFireAuth) { }

  login(): Promise<firebase.auth.UserCredential> {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({prompt: 'select_account'});
    return this.auth.signInWithPopup(provider);
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

  get user(): Observable<firebase.User> {
    return this.auth.user;
  }
}
