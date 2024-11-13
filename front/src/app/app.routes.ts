import { Routes } from '@angular/router';
import { adminRoutes } from './admin/admin.routes';

export const routes: Routes = [
  {
    path: '',
    title: 'Wellness With Jana',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'services',
    title: 'Services',
    loadComponent: () => import('./services/services.component').then(m => m.ServicesComponent),
  },
  {
    path: 'contact',
    title: 'Contact',
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: 'about',
    title: 'About',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'admin',
    title: 'Admin',
    children: adminRoutes,
  },
];
