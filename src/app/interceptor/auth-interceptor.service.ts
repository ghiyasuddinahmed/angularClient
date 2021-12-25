import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { StoreDataService } from '../services/store-data.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private tokenStore: StoreDataService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.tokenStore.loadToken();
    alert("Auth interceptor")
    if (this.tokenStore.authToken == "null" || this.tokenStore.authToken == null){
      this.tokenStore.storeToken(null)
    }
    request = request.clone({ headers: request.headers.append('x-auth-token', this.tokenStore.authToken) })
    return next.handle(request);
  }
}
