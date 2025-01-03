import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Button } from 'primeng/button';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { HomeSummaryComponent } from './home-summary/home-summary.component';
import { HomeHighlightedServiceComponent } from './home-highlighted-service/home-highlighted-service.component';
import { HomeServicesListComponent } from './home-services-list/home-services-list.component';
import { HomeHighlightedGuideComponent } from './home-highlighted-guide/home-highlighted-guide.component';
import { HomeClientTestemonialsComponent } from './home-client-testemonials/home-client-testemonials.component';
import { HomeMarketingMessageComponent } from './home-marketing-message/home-marketing-message.component';
import { HomeTrialComponent } from './home-trial/home-trial.component';
import { HomeSocialShowcaseComponent } from './home-social-showcase/home-social-showcase.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    Button,
    HomeBannerComponent,
    HomeSummaryComponent,
    HomeHighlightedServiceComponent,
    HomeServicesListComponent,
    HomeHighlightedGuideComponent,
    HomeClientTestemonialsComponent,
    HomeMarketingMessageComponent,
    HomeTrialComponent,
    HomeSocialShowcaseComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
