import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminHomeBannerComponent } from './admin-home-banner/admin-home-banner.component';
import { AdminHomeSummaryComponent } from './admin-home-summary/admin-home-summary.component';
import {
  AdminHomeHighlightedServiceComponent
} from './admin-home-highlighted-service/admin-home-highlighted-service.component';
import { AdminHomeServicesListComponent } from './admin-home-services-list/admin-home-services-list.component';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    Button,
    ReactiveFormsModule,
    AdminHomeBannerComponent,
    AdminHomeSummaryComponent,
    AdminHomeHighlightedServiceComponent,
    AdminHomeServicesListComponent,
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss',
})
export class AdminHomeComponent {}
