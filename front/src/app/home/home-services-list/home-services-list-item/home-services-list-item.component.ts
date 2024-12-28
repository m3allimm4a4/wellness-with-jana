import { Component, input } from '@angular/core';
import { AssetComponent } from '../../../shared/components/asset/asset.component';
import { BookingService } from '../../../shared/services/booking.service';
import { Service } from '../../../shared/interfaces/service.interface';

@Component({
  selector: 'app-home-services-list-item',
  standalone: true,
  imports: [AssetComponent],
  templateUrl: './home-services-list-item.component.html',
  styleUrl: './home-services-list-item.component.scss',
})
export class HomeServicesListItemComponent {
  service = input<Service>();

  constructor(private bookingService: BookingService) {}

  onBookClicked() {
    const service = this.service();
    if (!service) return;
    this.bookingService.openBookingDialog(service);
  }
}
