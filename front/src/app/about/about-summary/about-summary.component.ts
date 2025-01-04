import { Component } from '@angular/core';
import { LazyAnimateDirective } from '../../shared/directives/lazy-animate.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-summary',
  imports: [LazyAnimateDirective, TranslateModule],
  templateUrl: './about-summary.component.html',
  styleUrl: './about-summary.component.scss',
})
export class AboutSummaryComponent {}
