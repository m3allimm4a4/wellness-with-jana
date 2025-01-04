import { Component } from '@angular/core';
import { AdminAboutBannerComponent } from './admin-about-banner/admin-about-banner.component';
import { AdminAboutSummaryComponent } from './admin-about-summary/admin-about-summary.component';
import { AdminAboutDescriptionComponent } from './admin-about-description/admin-about-description.component';

@Component({
  selector: 'app-admin-about',
  imports: [AdminAboutBannerComponent, AdminAboutSummaryComponent, AdminAboutDescriptionComponent],
  templateUrl: './admin-about.component.html',
  styleUrl: './admin-about.component.scss',
})
export class AdminAboutComponent {}
