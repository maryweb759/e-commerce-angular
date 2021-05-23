import { Injectable } from '@angular/core';
import {AppUser} from '../modules/app-user'; 
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import firebase from "firebase/app";

@Injectable({ 
  providedIn: 'root'
}) 
export class UserService {

  constructor(private _db: AngularFireDatabase) { } 
  save(user: firebase.User) {
    this._db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    })
  } 

  get(uid: string): AngularFireObject<AppUser> {
    return this._db.object('/users/' + uid);
  }
}
