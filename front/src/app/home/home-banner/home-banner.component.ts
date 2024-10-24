import { Component } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-home-banner',
  standalone: true,
  imports: [Button],
  templateUrl: './home-banner.component.html',
  styleUrl: './home-banner.component.scss',
})
export class HomeBannerComponent {}
