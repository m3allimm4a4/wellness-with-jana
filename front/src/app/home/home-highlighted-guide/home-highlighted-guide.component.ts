import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { LazyAnimateDirective } from '../../shared/directives/lazy-animate.directive';

@Component({
  selector: 'app-home-highlighted-guide',
  standalone: true,
  imports: [Button, LazyAnimateDirective],
  templateUrl: './home-highlighted-guide.component.html',
  styleUrl: './home-highlighted-guide.component.scss',
})
export class HomeHighlightedGuideComponent {}
