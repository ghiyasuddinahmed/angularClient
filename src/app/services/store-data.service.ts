import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreDataService {
  authToken: any;
  user: any;

  constructor() {}

  storeToken(token: any) {
    localStorage.setItem('id_token', token);
    this.authToken = token;
  }

  storeUser(user: any) {
    localStorage.setItem('user', user);
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
