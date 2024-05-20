import { Routes } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { UsersComponent } from './users/users.component';
import { AddBannerComponent } from './banner/add-banner/add-banner.component';
import { AddUsersComponent } from './users/add-users/add-users.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

// ui


export const AdminUiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'banner',
        component: BannerComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path:'add-banner',
        component:AddBannerComponent
      },
      {
        path:'add-users',
        component:AddUsersComponent
      },
      {
        path:'profile',
        component:AdminProfileComponent
      }
    ],
  },
];
