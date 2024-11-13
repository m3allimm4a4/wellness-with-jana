import { Component } from '@angular/core';
import { AdminAboutBannerComponent } from './admin-about-banner/admin-about-banner.component';

@Component({
  selector: 'app-admin-about',
  standalone: true,
  imports: [AdminAboutBannerComponent],
  templateUrl: './admin-about.component.html',
  styleUrl: './admin-about.component.scss',
})
export class AdminAboutComponent {}
