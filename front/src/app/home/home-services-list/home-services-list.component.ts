import { Component } from '@angular/core';
import { HomeServicesListItemComponent } from './home-services-list-item/home-services-list-item.component';
import { LazyAnimateDirective } from '../../shared/directives/lazy-animate.directive';

@Component({
  selector: 'app-home-services-list',
  standalone: true,
  imports: [HomeServicesListItemComponent, LazyAnimateDirective],
  templateUrl: './home-services-list.component.html',
  styleUrl: './home-services-list.component.scss',
})
export class HomeServicesListComponent {}
