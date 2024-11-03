import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
})
export class AdminHeaderComponent {
  items: MenuItem[] = [
    { label: 'Home', routerLink: '/admin/home' },
    { label: 'Services', routerLink: '/admin/services' },
    { label: 'Testemonials', routerLink: '/admin/testemonials' },
    { label: 'About', routerLink: '/admin/about' },
    { label: 'Contact', routerLink: '/admin/contact' },
  ];
}
