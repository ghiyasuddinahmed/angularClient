import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root',
})
export class RestapidataService {
  userUrl: string = 'http://localhost:5000/api/users';
  authUrl: string = 'http://localhost:5000/api/auth';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  post(body: any, action: string) {
    if (action === 'register') {
      return this.http.post(this.userUrl, body, this.httpOptions);
    } else {
      return this.http.post(this.authUrl, body, this.httpOptions);
    }
  }

  get() {
    let token = localStorage.getItem('token_id');
    if (token) {
      this.httpOptions.headers.set('x-auth-token', token);
    }
    return this.http.get(this.authUrl);
  }
}
