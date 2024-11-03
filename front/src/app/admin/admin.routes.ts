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
      {
        path: 'services/:id',
        title: 'Admin Service Details',
        loadComponent: () =>
          import('./admin-services/admin-services-details/admin-services-details.component').then(
            m => m.AdminServicesDetailsComponent,
          ),
      },
      {
        path: 'testemonials',
        title: 'Admin Testemonials',
        loadComponent: () =>
          import('./admin-testemonials/admin-testemonials.component').then(m => m.AdminTestemonialsComponent),
      },
      {
        path: 'testemonials/:id',
        title: 'Admin Testemonial Details',
        loadComponent: () =>
          import('./admin-testemonials/admin-testemonials-details/admin-testemonials-details.component').then(
            m => m.AdminTestemonialsDetailsComponent,
          ),
      },
    ],
  },
];
