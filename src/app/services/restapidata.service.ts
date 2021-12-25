import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {StoreDataService} from "./store-data.service";

@Injectable({
  providedIn: 'root',
})
export class RestapidataService {
  userUrl: string = '/api/users';
  authUrl: string = '/api/auth';
  constructor(private http: HttpClient, private tokenStore: StoreDataService) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  post(body: any, action: string): Promise<void| any> {
    if (action === 'register') {
      alert(body)
      return this.http.post(this.userUrl, body, this.httpOptions)
        .toPromise()
        .then((response: any) => response)
        .catch(this.error)
    } else {
      return this.http.post(this.authUrl, body, this.httpOptions)
        .toPromise()
        .then((response: any) => response)
        .catch(this.error)
    }
  }

  get(): Promise<void|any> {
    this.tokenStore.loadToken()
    if (this.tokenStore.authToken == "null" || this.tokenStore.authToken == null){
      this.httpOptions.headers = this.httpOptions.headers.append('x-auth-token', this.tokenStore.authToken);
    }else{
      return new Promise(resolve => null);
    }
    return this.http.get(this.authUrl, this.httpOptions)
      .toPromise()
      .then((response: any) => response)
      .catch(this.error)
  }

  private error (error: any) {
    let message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
  }
}
