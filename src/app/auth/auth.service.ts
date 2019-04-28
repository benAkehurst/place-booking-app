import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
  kind: string;
  idTokem: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = false;
  private _userId = null;
  private firebaseApiKey: string = environment.firebaseApiKey;

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

  constructor(private http: HttpClient) {}

  public signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${
        this.firebaseApiKey
      }`,
      { email: email, password: password, returnSecureToken: true }
    );
  }

  /**
   * Sets the user login status to true
   */
  public login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${
        this.firebaseApiKey
      }`,
      { email: email, password: password, returnSecureToken: true}
    );
  }

  /**
   * Sets the logout status to false. Keeps the user on auth page until logging in
   */
  public logout() {
    this._userIsAuthenticated = false;
  }
}
