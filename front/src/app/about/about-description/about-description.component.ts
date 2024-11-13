import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { LazyAnimateDirective } from '../../shared/directives/lazy-animate.directive';
import { TranslateModule } from '@ngx-translate/core';
import { AssetComponent } from '../../shared/components/asset/asset.component';

@Component({
  selector: 'app-about-description',
  standalone: true,
  imports: [Button, LazyAnimateDirective, TranslateModule, AssetComponent],
  templateUrl: './about-description.component.html',
  styleUrl: './about-description.component.scss',
})
export class AboutDescriptionComponent {}
