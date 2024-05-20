import { Component } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';
import { AdminNavItems } from './admin-siderbar-data';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent {
  adminnavItems = AdminNavItems;

  constructor(public navService: NavService) {}

  ngOnInit(): void {}
}
