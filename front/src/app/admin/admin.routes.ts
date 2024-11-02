import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin.component').then(m => m.AdminComponent),
    children: [
      {
        path: 'home',
        title: 'Admin Home',
        loadComponent: () => import('./admin-home/admin-home.component').then(m => m.AdminHomeComponent),
      },
      {
        path: 'services',
        title: 'Admin Services',
        loadComponent: () => import('./admin-services/admin-services.component').then(m => m.AdminServicesComponent),
      },
    ],
  },
];