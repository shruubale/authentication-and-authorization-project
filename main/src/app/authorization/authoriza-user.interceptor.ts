import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizeUserInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const API_URL = 'http://localhost:3000';
    const authToken = localStorage.getItem("token")
    if (authToken) {
      request = request.clone({
        url: `${API_URL}${request.url}`,
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    } else {
      request = request.clone({
        url: `${API_URL}${request.url}`,
      });
    }
    return next.handle(request);
  }
}
