import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, Button],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  items: MenuItem[] = [
    { label: 'Home', routerLink: '/' },
    { label: 'About', routerLink: '/about' },
    { label: 'Contact', routerLink: '/contact' },
  ];

  constructor(private authService: AuthService) {}

  showLogin() {
    this.authService.openLoginDialog();
  }
}
