import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-header',
  imports: [MenubarModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
})
export class AdminHeaderComponent {
  items: MenuItem[] = [
    { label: 'Home', routerLink: '/admin/home' },
    { label: 'Services', routerLink: '/admin/services' },
    { label: 'Bookings', routerLink: '/admin/bookings' },
    { label: 'Blogs', routerLink: '/admin/blogs' },
    { label: 'Testemonials', routerLink: '/admin/testemonials' },
    { label: 'IG Posts', routerLink: '/admin/ig-posts' },
    { label: 'About', routerLink: '/admin/about' },
    { label: 'Contact', routerLink: '/admin/contact' },
  ];
}
