import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  isLoggedIn() {
    // return localStorage.getItem('token');
    const token = localStorage.getItem('token');
    return token ? of(true) : of(false);
  }

  isUserActive()
  {
    return localStorage.getItem('status') === 'true';
  }
  
  isUser(): boolean {
    return localStorage.getItem('role') === 'USER';
  }
}