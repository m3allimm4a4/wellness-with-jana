import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { LazyAnimateDirective } from '../../shared/directives/lazy-animate.directive';
import { TranslateModule } from '@ngx-translate/core';
import { AssetComponent } from '../../shared/components/asset/asset.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-highlighted-service',
  standalone: true,
  imports: [Button, LazyAnimateDirective, TranslateModule, AssetComponent, RouterLink],
  templateUrl: './home-highlighted-service.component.html',
  styleUrl: './home-highlighted-service.component.scss',
})
export class HomeHighlightedServiceComponent {
  constructor(private router: Router) {}

  routeToContact() {
    this.router.navigate(['/contact']).then();
  }
}
