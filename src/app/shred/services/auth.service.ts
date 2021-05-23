import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from "firebase/app";
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {of} from 'rxjs' 
import { UserService } from './user.service';
import { AppUser } from '../modules/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // watch the user and detect anychanges
 user$ : Observable<firebase.User>;

  constructor(
    private _afAuth: AngularFireAuth,
    private _route: ActivatedRoute,
    private _user: UserService
  ) { 
    // see if the user is signIn || signOut
    this.user$ = _afAuth.authState;
  } 

  login() {
    const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl') || '/';
    sessionStorage.setItem('returnUrl', returnUrl);
    const provider = new firebase.auth.GoogleAuthProvider();
    this._afAuth.signInWithPopup(provider);
  } 

  logout() {
    this._afAuth.signOut()
  } 

  get appUser$(): Observable<AppUser> {
    // if the user is signIn get his ID else return nothing
    // return the user Obsevable and loop through it and get UID and data [name-email-isAdmin]
    return this.user$.pipe( 
      // The main difference between switchMap and other flattening operators is the cancelling effect. 
      //On each emission the previous inner observable (the result of the function you supplied) is 
      //cancelled and the new observable is subscribed. You can remember this by the phrase “switch to a new observable.”
      switchMap(user => {
        if(user) return this._user.get(user.uid).valueChanges();
        // else return all 
        return of(null)
      })
    )
  }
}
