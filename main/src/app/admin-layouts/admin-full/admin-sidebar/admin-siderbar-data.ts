import { AdminNavItem } from './admin-nav-item/admin-nav-item';
export const AdminNavItems: AdminNavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/admin/admin-dashboard',
  },
  {
    navCap: 'Ui Components',
  },
  {
    displayName: 'Banner',
    iconName: 'photo',
    route: 'admin/admin-ui-components/banner',
  },
  {
    displayName: 'Users',
    iconName: 'users',
    route: 'admin/admin-ui-components/users',
  },
];
