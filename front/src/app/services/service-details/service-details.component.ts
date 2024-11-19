import { Component, input } from '@angular/core';
import { Service } from '../../shared/interfaces/service.interface';
import { AssetComponent } from '../../shared/components/asset/asset.component';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [AssetComponent, Button],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.scss',
})
export class ServiceDetailsComponent {
  service = input.required<Service>();
}
