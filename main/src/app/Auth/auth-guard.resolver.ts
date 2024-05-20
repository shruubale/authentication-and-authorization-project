import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardResolver implements Resolve<boolean> {
  constructor(private authService: AuthService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
        map((isLoggedIn: boolean) => {
          if (isLoggedIn) {
            this.router.navigate(['/dashboard']);
            return false;
          } else {
            return true;
          }
        }),
        catchError((error) => {
          console.error('Error in AuthResolver:', error);
          return of(true);
        })
      );
    }
  }
