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
    if ("x-auth-token" in this.httpOptions.headers){
      this.httpOptions.headers = this.httpOptions.headers.delete('x-auth-token')
    }
    if (action === 'register') {
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
    console.log(JSON.stringify(this.httpOptions))
    if ("x-auth-token" in this.httpOptions.headers){
      this.httpOptions.headers = this.httpOptions.headers.delete('x-auth-token')
    }
    this.tokenStore.loadToken()
    if (this.tokenStore.authToken != "null" || this.tokenStore.authToken != null){
      this.httpOptions.headers = this.httpOptions.headers.append('x-auth-token', this.tokenStore.authToken);
    }else{
      return new Promise(resolve => null);
    }
    return this.http.get(this.authUrl, this.httpOptions)
      .toPromise()
      .then((response: any) => response)
      .catch(this.error)
  }

  put(body: any): Promise<void|any>{
    this.tokenStore.loadToken()
    this.tokenStore.loadUser()
    return this.http.put(this.authUrl+'/update/'+this.tokenStore.user._id, body, this.httpOptions)
      .toPromise()
      .then((response: any) => response)
      .catch(this.error)
  }

  delete(): Promise<void|any>{
    this.tokenStore.loadToken()
    this.tokenStore.loadUser()
    return this.http.get(this.authUrl+'/delete/'+this.tokenStore.user._id, this.httpOptions)
      .toPromise()
      .then((response: any) => response)
      .catch(this.error)
  }

  private error (error: any) {
    var e_msg = ''
    try{
      if (error){
        if ("error" in error){
          console.log("in error.error")
          if ("errors" in error.error){
            console.log("in error.error.errors")
            e_msg += error.error.errors[0].msg+"\n"
          }else if ("error" in error.error){
            console.log("in error.error[0].msg")
            e_msg += error.error.error[0].msg+"\n"
          }else{
            e_msg += error.error[0].msg+"\n"
          }
        }else{
          e_msg += error[0].msg+"\n"
        }
      }
    }catch(e){

    }

    alert(e_msg)
    let message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  }
}
