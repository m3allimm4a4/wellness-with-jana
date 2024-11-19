import { Component, input } from '@angular/core';
import { Service } from '../../shared/interfaces/service.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-service-summary',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './service-summary.component.html',
  styleUrl: './service-summary.component.scss',
})
export class ServiceSummaryComponent {
  services = input<Service[]>([]);
}
