import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Button } from 'primeng/button';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { HomeSummaryComponent } from './home-summary/home-summary.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, Button, HomeBannerComponent, HomeSummaryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
