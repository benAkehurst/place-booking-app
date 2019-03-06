import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userIsAuthenticated: boolean = false;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor() { }

  public login() {
    this._userIsAuthenticated = true;
  }

  public logout() {
    this._userIsAuthenticated = false;
  }
}
