import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { UsersComponent } from './users/users.component';
import { RouterModule } from '@angular/router';
import { AdminUiComponentsRoutes } from './admin-ui-components.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { EditBannerComponent } from './banner/edit-banner/edit-banner.component';
import { MatNativeDateModule } from '@angular/material/core';
import { AddBannerComponent } from './banner/add-banner/add-banner.component';
import { AddUsersComponent } from './users/add-users/add-users.component';
import { EditUsersComponent } from './users/edit-users/edit-users.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';



@NgModule({
  declarations: [
    BannerComponent,
    UsersComponent,
    EditBannerComponent,
    AddBannerComponent,
    AddUsersComponent,
    EditUsersComponent,
    AdminProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    RouterModule.forChild(AdminUiComponentsRoutes),
  ]
})
export class AdminUiComponentsModule { }
