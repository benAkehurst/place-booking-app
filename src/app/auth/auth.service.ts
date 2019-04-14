import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = true;
  private _userId = 'cbd';

  /**
   * Returns from the private var is the user is authenticated
   */
  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  /**
   * Returns from the private var what the user id is
   */
  get userId() {
    return this._userId;
  }

  constructor() {}

  /**
   * Sets the user login status to true
   */
  public login() {
    this._userIsAuthenticated = true;
  }

  /**
   * Sets the logout status to false. Keeps the user on auth page until logging in
   */
  public logout() {
    this._userIsAuthenticated = false;
  }
}
