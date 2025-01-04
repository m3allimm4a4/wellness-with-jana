import { Component } from '@angular/core';
import {
  AdminBookingsConfigurationComponent
} from './admin-bookings-configuration/admin-bookings-configuration.component';
import { AdminBookingsListComponent } from './admin-bookings-list/admin-bookings-list.component';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [AdminBookingsConfigurationComponent, AdminBookingsListComponent],
  templateUrl: './admin-bookings.component.html',
  styleUrl: './admin-bookings.component.scss',
})
export class AdminBookingsComponent {}
