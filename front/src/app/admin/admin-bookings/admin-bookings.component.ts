import { Component } from '@angular/core';
import { AdminBookingsConfigurationComponent } from './admin-bookings-configuration/admin-bookings-configuration.component';
import { AdminBookingsListComponent } from './admin-bookings-list/admin-bookings-list.component';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';

@Component({
  selector: 'app-admin-bookings',
  imports: [AdminBookingsConfigurationComponent, AdminBookingsListComponent, Tabs, TabList, Tab, TabPanels, TabPanel],
  templateUrl: './admin-bookings.component.html',
  styleUrl: './admin-bookings.component.scss',
})
export class AdminBookingsComponent {}
