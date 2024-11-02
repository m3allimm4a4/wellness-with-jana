import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { HomeServicesListItemComponent } from './home-services-list-item/home-services-list-item.component';
import { LazyAnimateDirective } from '../../shared/directives/lazy-animate.directive';
import { TranslateModule } from '@ngx-translate/core';
import { ServicesApiService } from '../../shared/services/services-api.service';
import { Service } from '../../shared/interfaces/service.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-services-list',
  standalone: true,
  imports: [HomeServicesListItemComponent, LazyAnimateDirective, TranslateModule],
  templateUrl: './home-services-list.component.html',
  styleUrl: './home-services-list.component.scss',
})
export class HomeServicesListComponent implements OnInit, OnDestroy {
  services = signal<Service[]>([]);

  private subscription = new Subscription();

  constructor(private servicesApiService: ServicesApiService) {}

  ngOnInit() {
    this.subscription.add(
      this.servicesApiService.getServices().subscribe(services => {
        this.services.set(services);
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
