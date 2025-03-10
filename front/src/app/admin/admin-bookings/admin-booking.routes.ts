import { Routes } from '@angular/router';

export const adminBookingRoutes: Routes = [
  {
    path: 'settings',
    loadComponent: () =>
      import('./admin-bookings-configuration/admin-bookings-configuration.component').then(
        m => m.AdminBookingsConfigurationComponent,
      ),
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./admin-bookings-list/admin-bookings-list.component').then(m => m.AdminBookingsListComponent),
  },
  {
    path: '**',
    redirectTo: 'settings',
  },
];
