import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuardResolver } from './Auth/auth-guard.resolver';
import { AdminFullComponent } from './admin-layouts/admin-full/admin-full.component';
import { AuthGuard } from './Auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication/login',
    pathMatch: 'full',
  },

  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
        
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
    ],
  },
  // admin routing modules implementation
  {
    path: 'admin',
    component: AdminFullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin',
        redirectTo: '/admin-dashboard',
        pathMatch: 'full',
      },
      {
        path: 'admin-dashboard',
        loadChildren: () =>
        import('./admin-pages/admin-pages.module').then((m) => m.AdminPagesModule)
        
      },
      {
        path: 'admin-ui-components',
        loadChildren: () =>
        import('./admin-pages/admin-ui-components/admin-ui-components.module').then((m) =>m.AdminUiComponentsModule)
      },
    ],
  },
  
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
    resolve:{
      auth:AuthGuardResolver
    },
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
