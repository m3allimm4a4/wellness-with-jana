import { Component } from '@angular/core';
import { AboutBannerComponent } from './about-banner/about-banner.component';
import { HomeMarketingMessageComponent } from '../home/home-marketing-message/home-marketing-message.component';
import { HomeClientTestemonialsComponent } from '../home/home-client-testemonials/home-client-testemonials.component';
import { HomeTrialComponent } from '../home/home-trial/home-trial.component';
import { HomeSocialShowcaseComponent } from '../home/home-social-showcase/home-social-showcase.component';
import { AboutSummaryComponent } from './about-summary/about-summary.component';
import { AboutDescriptionComponent } from './about-description/about-description.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    AboutBannerComponent,
    HomeMarketingMessageComponent,
    HomeClientTestemonialsComponent,
    HomeTrialComponent,
    HomeSocialShowcaseComponent,
    AboutSummaryComponent,
    AboutDescriptionComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
