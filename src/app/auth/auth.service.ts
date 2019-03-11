import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Protected variable to control if the user is logged in or not
   */
  private _userIsAuthenticated: boolean = true;

  /**
   * Gets the default value of the logged in state
   */
  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor() { }

  /**
   * Method to login user
   */
  public login() {
    this._userIsAuthenticated = true;
  }

  /**
   * Method to logout user
   */
  public logout() {
    this._userIsAuthenticated = false;
  }
}
