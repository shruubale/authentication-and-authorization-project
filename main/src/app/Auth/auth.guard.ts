import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) { }
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // debugger;
    let isUserLoggedIn = this.authService.isLoggedIn();
    console.log(isUserLoggedIn);

    let isUserActive = this.authService.isUserActive();
    console.log(isUserActive);



    if (!isUserLoggedIn) {
      alert("Please Login First");
      this.router.navigate(['/authentication/login']);
      return false;
    }

    if (!isUserActive) {
      // alert("user has been blocked by admin");
      this.openSnackBar("User Has been blocked by admin Or Login first")
      this.router.navigate(['/authentication/login']);
      return false;
    }

    let isUser = this.authService.isUser();
    console.log(isUser);


    if (isUser && isUserActive && next.routeConfig.path.startsWith('admin')) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    
    return true;
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 2000, });
  }

}

