import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { AuthService } from '../shared/services/auth.service';
import { RouterLink } from '@angular/router';
import { User, UserRole } from '../shared/interfaces/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [MenubarModule, Button, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly user = signal<User | undefined>(undefined);
  private readonly subscription = new Subscription();

  items = computed<MenuItem[]>(() => {
    const items = [
      { label: 'Home', routerLink: '/' },
      { label: 'Services', routerLink: '/services' },
      // { label: 'Blog', routerLink: '/blogs' },
      { label: 'About', routerLink: '/about' },
      { label: 'Contact', routerLink: '/contact' },
      this.user()
        ? { label: 'Log Out', command: () => this.authService.logout().subscribe() }
        : {
            label: 'Log In',
            command: () => this.authService.openLoginDialog(),
          },
    ];
    if (this.user()?.roles.includes(UserRole.ADMIN)) {
      items.push({ label: 'Admin', routerLink: '/admin/home' });
    }
    return items;
  });

  ngOnInit() {
    this.subscription.add(this.authService.getUser$().subscribe(user => this.user.set(user)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showLogin() {
    this.authService.openLoginDialog();
  }
}
