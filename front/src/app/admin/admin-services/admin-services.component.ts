import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Service } from '../../shared/interfaces/service.interface';
import { ServicesApiService } from '../../shared/services/services-api.service';
import { Subscription } from 'rxjs';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AssetComponent } from '../../shared/components/asset/asset.component';
import { AdminServicesSummaryComponent } from './admin-services-summary/admin-services-summary.component';
import { AdminServicesBannerComponent } from './admin-services-banner/admin-services-banner.component';

@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [
    TableModule,
    Button,
    RouterLink,
    AssetComponent,
    AdminServicesSummaryComponent,
    AdminServicesBannerComponent,
  ],
  templateUrl: './admin-services.component.html',
  styleUrl: './admin-services.component.scss',
})
export class AdminServicesComponent implements OnInit, OnDestroy {
  services = signal<Service[]>([]);

  private subscription = new Subscription();

  constructor(
    private confirmationService: ConfirmationService,
    private servicesApiService: ServicesApiService,
  ) {}

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

  onDeleteClick(id: string) {
    this.confirmationService.confirm({
      key: 'confirmDialog',
      message: 'Are you sure you want to delete this service?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.subscription.add(this.servicesApiService.deleteService(id).subscribe());
      },
    });
  }
}
