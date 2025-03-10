import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { LazyAnimateDirective } from '../../shared/directives/lazy-animate.directive';
import { TranslateModule } from '@ngx-translate/core';
import { AssetComponent } from '../../shared/components/asset/asset.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-description',
  imports: [Button, LazyAnimateDirective, TranslateModule, AssetComponent, RouterLink],
  templateUrl: './about-description.component.html',
  styleUrl: './about-description.component.scss',
})
export class AboutDescriptionComponent {}
