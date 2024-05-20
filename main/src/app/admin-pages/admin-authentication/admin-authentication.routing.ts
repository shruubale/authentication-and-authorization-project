import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';



export const AdminAuthenticationRoutes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'admin-login',
        component: AdminLoginComponent,
      },
    ],
  },
];
