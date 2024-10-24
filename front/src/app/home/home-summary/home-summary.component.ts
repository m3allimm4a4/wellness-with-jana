import { Component } from '@angular/core';
import { LazyAnimateDirective } from '../../shared/directives/lazy-animate.directive';

@Component({
  selector: 'app-home-summary',
  standalone: true,
  imports: [LazyAnimateDirective],
  templateUrl: './home-summary.component.html',
  styleUrl: './home-summary.component.scss',
})
export class HomeSummaryComponent {}
