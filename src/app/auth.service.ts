import { Injectable } from '@angular/core';

import firebase from '../environments/firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // [x: string]: any;

  private _authState: boolean = false;

  constructor(private router: Router) {

    firebase.auth().onAuthStateChanged(user => {
      // si user est null => !user true => !!user => false
      // si user est différent de null => !user => false => !!user true
      // this._authState pour assigner le résultat :  this._authState =  !!user
      this._authState = !!user;
    });

  }

  get authState(): boolean {
    return this._authState;
  }

  // méthode d'authentification
  auth(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    firebase.auth().signOut().then(
      () => this.router.navigate(['/albums'], { queryParams: { message : "Success logout"}})
    );
  }
}