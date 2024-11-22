import { Component, input } from '@angular/core';
import { Service } from '../../shared/interfaces/service.interface';
import { RouterLink } from '@angular/router';
import { LazyAnimateDirective } from '../../shared/directives/lazy-animate.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-service-summary',
  standalone: true,
  imports: [RouterLink, LazyAnimateDirective, TranslateModule],
  templateUrl: './service-summary.component.html',
  styleUrl: './service-summary.component.scss',
})
export class ServiceSummaryComponent {
  services = input<Service[]>([]);
}
