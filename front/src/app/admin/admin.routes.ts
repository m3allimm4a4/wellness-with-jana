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
        path: 'bookings',
        title: 'Admin Bookings',
        loadComponent: () => import('./admin-bookings/admin-bookings.component').then(m => m.AdminBookingsComponent),
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
      {
        path: 'ig-posts',
        title: 'Admin IG Posts',
        loadComponent: () => import('./admin-ig-posts/admin-ig-posts.component').then(m => m.AdminIgPostsComponent),
      },
      {
        path: 'ig-posts/:id',
        title: 'Admin IG Post Details',
        loadComponent: () =>
          import('./admin-ig-posts/admin-ig-post-details/admin-ig-post-details.component').then(
            m => m.AdminIgPostDetailsComponent,
          ),
      },
      {
        path: 'contact',
        title: 'Admin Contact',
        loadComponent: () => import('./admin-contact/admin-contact.component').then(m => m.AdminContactComponent),
      },
      {
        path: 'about',
        title: 'Admin About',
        loadComponent: () => import('./admin-about/admin-about.component').then(m => m.AdminAboutComponent),
      },
    ],
  },
];
