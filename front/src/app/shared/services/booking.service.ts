import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BookingComponent } from '../components/booking/booking.component';
import { Service } from '../interfaces/service.interface';
import { tap, timer } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private bookingDialog: DynamicDialogRef | undefined;

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
  ) {}

  openBookingDialog(service: Service) {
    this.bookingDialog = this.dialogService.open(BookingComponent, {
      header: 'Book A Session',
      modal: true,
      appendTo: 'body',
      data: { service },
    });
  }

  confirmBooking(service: Service) {
    return timer(3000).pipe(
      tap(() => {
        this.closeBookingDialog();
        this.messageService.add({
          key: 'toast',
          sticky: true,
          severity: 'success',
          summary: 'Success',
          detail: 'Booking Confirmed, check your email for more information',
        });
      }),
    );
  }

  private closeBookingDialog() {
    this.bookingDialog?.close();
    this.bookingDialog = undefined;
  }
}
