import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-services-list-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-services-list-item.component.html',
  styleUrl: './home-services-list-item.component.scss',
})
export class HomeServicesListItemComponent {
  image = input<string>('');
  header = input<string>('');
  content = input<string>('');
  routerLink = input<string>();
}
