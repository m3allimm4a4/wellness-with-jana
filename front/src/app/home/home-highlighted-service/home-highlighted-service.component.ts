import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { LazyAnimateDirective } from '../../shared/directives/lazy-animate.directive';

@Component({
  selector: 'app-home-highlighted-service',
  standalone: true,
  imports: [Button, LazyAnimateDirective],
  templateUrl: './home-highlighted-service.component.html',
  styleUrl: './home-highlighted-service.component.scss',
})
export class HomeHighlightedServiceComponent {}
