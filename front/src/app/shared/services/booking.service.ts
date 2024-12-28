import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BookingComponent } from '../components/booking/booking.component';
import { Service } from '../interfaces/service.interface';
import { tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Timeslot } from '../interfaces/timeslot.interface';
import { Appointment } from '../interfaces/appointment.interface';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private bookingDialog: DynamicDialogRef | undefined;

  constructor(
    private http: HttpClient,
    private dialogService: DialogService,
    private messageService: MessageService,
  ) {}

  openBookingDialog(service: Service) {
    this.bookingDialog = this.dialogService.open(BookingComponent, {
      header: 'Book A Session',
      modal: true,
      appendTo: 'body',
      width: '40rem',
      data: { service },
    });
  }

  confirmBooking(appointment: Appointment) {
    return this.http.post<Appointment>(`${environment.apiUrl}/booking`, appointment).pipe(
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

  getTimeslots(day: Date) {
    const params = new HttpParams().append('day', day.toISOString());
    return this.http.get<Timeslot[]>(`${environment.apiUrl}/booking/timeslots`, { params });
  }

  private closeBookingDialog() {
    this.bookingDialog?.close();
    this.bookingDialog = undefined;
  }
}
