import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin.component').then(m => m.AdminComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./admin-home/admin-home.component').then(m => m.AdminHomeComponent),
      },
    ],
  },
];
