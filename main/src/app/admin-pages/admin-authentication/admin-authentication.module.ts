import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RouterModule } from '@angular/router';
import { AdminAuthenticationRoutes } from './admin-authentication.routing';

@NgModule({
  declarations: [
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminAuthenticationRoutes)
  ]
})
export class AdminAuthenticationModule { }
