import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-banner',
  standalone: true,
  imports: [Button, TranslateModule],
  templateUrl: './home-banner.component.html',
  styleUrl: './home-banner.component.scss',
})
export class HomeBannerComponent {}
