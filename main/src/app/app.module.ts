import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';
import { AuthorizeUserInterceptor } from './authorization/authoriza-user.interceptor';
import { AdminBlankComponent } from './admin-layouts/admin-blank/admin-blank.component';
import { AdminFullComponent } from './admin-layouts/admin-full/admin-full.component';
import { AdminHeaderComponent } from './admin-layouts/admin-full/admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-layouts/admin-full/admin-sidebar/admin-sidebar.component';
import { AdminNavItemComponent } from './admin-layouts/admin-full/admin-sidebar/admin-nav-item/admin-nav-item.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    SidebarComponent,
    HeaderComponent,
    BrandingComponent,
    AppNavItemComponent,
    AdminBlankComponent,
    AdminFullComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminNavItemComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
  providers:[
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthorizeUserInterceptor, multi: true
     }
  ]
})
export class AppModule {}
