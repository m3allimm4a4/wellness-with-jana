import { Component } from '@angular/core';
import { LazyAnimateDirective } from '../../shared/directives/lazy-animate.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-summary',
  standalone: true,
  imports: [LazyAnimateDirective, TranslateModule],
  templateUrl: './home-summary.component.html',
  styleUrl: './home-summary.component.scss',
})
export class HomeSummaryComponent {}
