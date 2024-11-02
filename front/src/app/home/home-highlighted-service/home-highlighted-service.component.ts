import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { LazyAnimateDirective } from '../../shared/directives/lazy-animate.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-highlighted-service',
  standalone: true,
  imports: [Button, LazyAnimateDirective, TranslateModule],
  templateUrl: './home-highlighted-service.component.html',
  styleUrl: './home-highlighted-service.component.scss',
})
export class HomeHighlightedServiceComponent {}
