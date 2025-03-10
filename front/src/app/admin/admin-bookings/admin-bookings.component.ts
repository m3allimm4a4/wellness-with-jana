import { Component, inject } from '@angular/core';
import { Tab, TabList, Tabs } from 'primeng/tabs';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-bookings',
  imports: [Tabs, TabList, Tab, RouterOutlet, RouterLink],
  templateUrl: './admin-bookings.component.html',
  styleUrl: './admin-bookings.component.scss',
})
export class AdminBookingsComponent {
  private readonly activateRoute = inject(ActivatedRoute);

  getCurrentPath() {
    return this.activateRoute.firstChild?.snapshot?.url?.[0]?.path || '';
  }
}
