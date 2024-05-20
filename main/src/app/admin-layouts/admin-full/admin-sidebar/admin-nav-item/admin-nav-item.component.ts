import { Component, Input } from '@angular/core';
import { AdminNavItem } from './admin-nav-item';
import { NavService } from 'src/app/services/nav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav-item',
  templateUrl: './admin-nav-item.component.html',
  styleUrls: ['./admin-nav-item.component.scss']
})
export class AdminNavItemComponent {
  @Input() item: AdminNavItem | any;
  @Input() depth: any;

  constructor(public navService: NavService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnChanges() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
      }
    });
  }

  onItemSelected(item: AdminNavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }

    // scroll
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0,
    });
  }
}
