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
import {
  AdminHomeHighlightedGuideComponent
} from './admin-home-highlighted-guide/admin-home-highlighted-guide.component';
import {
  AdminHomeMarketingMessageComponent
} from './admin-home-marketing-message/admin-home-marketing-message.component';
import { AdminHomeTrialComponent } from './admin-home-trial/admin-home-trial.component';

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
    AdminHomeHighlightedGuideComponent,
    AdminHomeMarketingMessageComponent,
    AdminHomeTrialComponent,
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss',
})
export class AdminHomeComponent {}
