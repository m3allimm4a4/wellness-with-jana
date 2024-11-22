import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ServicesApiService } from '../shared/services/services-api.service';
import { Service } from '../shared/interfaces/service.interface';
import { Subscription } from 'rxjs';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { HomeTrialComponent } from '../home/home-trial/home-trial.component';
import { HomeSocialShowcaseComponent } from '../home/home-social-showcase/home-social-showcase.component';
import { ServiceSummaryComponent } from './service-summary/service-summary.component';
import { ServicesBannerComponent } from './services-banner/services-banner.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    ServiceDetailsComponent,
    HomeTrialComponent,
    HomeSocialShowcaseComponent,
    ServiceSummaryComponent,
    ServicesBannerComponent,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit, OnDestroy {
  services = signal<Service[]>([]);

  private subscription = new Subscription();

  constructor(private servicesApiService: ServicesApiService) {}

  ngOnInit() {
    this.subscription.add(this.servicesApiService.getServices().subscribe(services => this.services.set(services)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
