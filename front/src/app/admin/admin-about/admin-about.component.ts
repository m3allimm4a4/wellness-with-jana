import { Component } from '@angular/core';
import { AdminAboutBannerComponent } from './admin-about-banner/admin-about-banner.component';
import { AdminAboutSummaryComponent } from './admin-about-summary/admin-about-summary.component';

@Component({
  selector: 'app-admin-about',
  standalone: true,
  imports: [AdminAboutBannerComponent, AdminAboutSummaryComponent],
  templateUrl: './admin-about.component.html',
  styleUrl: './admin-about.component.scss',
})
export class AdminAboutComponent {}
