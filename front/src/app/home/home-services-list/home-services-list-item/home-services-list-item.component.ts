import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AssetComponent } from '../../../shared/components/asset/asset.component';

@Component({
  selector: 'app-home-services-list-item',
  standalone: true,
  imports: [RouterLink, AssetComponent],
  templateUrl: './home-services-list-item.component.html',
  styleUrl: './home-services-list-item.component.scss',
})
export class HomeServicesListItemComponent {
  assetId = input<string>('');
  header = input<string>('');
  content = input<string>('');
  routerLink = input<string>();
}
