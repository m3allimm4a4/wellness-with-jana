import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BookingComponent } from '../components/booking/booking.component';
import { Service } from '../interfaces/service.interface';
import { map, Observable, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Timeslot } from '../interfaces/timeslot.interface';
import { Appointment, AppointmentResponse } from '../interfaces/appointment.interface';

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
      closable: true,
      appendTo: 'body',
      width: '40rem',
      data: { service },
    });
  }

  confirmBooking(appointment: Appointment) {
    return this.http.post<Appointment>(`${environment.apiUrl}/booking`, appointment).pipe(
      tap(() => {
        this.closeBookingDialog();
        this.showToast('success', 'Success', 'Booking Confirmed, check your email for more information', true);
      }),
    );
  }

  getTimeslots(day: Date) {
    const params = new HttpParams().append('day', day.toISOString());
    return this.http.get<Timeslot[]>(`${environment.apiUrl}/booking/timeslots`, { params });
  }

  getAppointments(showHistory: boolean): Observable<Appointment[]> {
    const params = new HttpParams().append('history', showHistory);
    return this.http.get<AppointmentResponse[]>(`${environment.apiUrl}/booking`, { params }).pipe(
      map(appointments =>
        appointments.map(a => ({
          id: a.id,
          name: a.name,
          country: a.country,
          email: a.email,
          phone: a.phone,
          start: new Date(a.start),
          end: new Date(a.end),
          confirmed: a.confirmed,
          service: a.service,
          createdAt: a.createdAt,
          updatedAt: a.updatedAt,
        })),
      ),
    );
  }

  adminConfirmBooking(appointment: Appointment) {
    return this.http
      .patch<Appointment>(`${environment.apiUrl}/booking/${appointment.id}`, null)
      .pipe(tap(() => this.showToast('success', 'Success', 'Booking Confirmed')));
  }

  adminCancelBooking(appointment: Appointment) {
    return this.http
      .delete(`${environment.apiUrl}/booking/${appointment.id}`)
      .pipe(tap(() => this.showToast('warn', 'Warning', 'Booking Cancelled')));
  }

  private closeBookingDialog() {
    this.bookingDialog?.close();
    this.bookingDialog = undefined;
  }

  private showToast(severity: string, summary: string, detail: string, sticky = false): void {
    this.messageService.add({
      key: 'toast',
      severity: severity,
      summary: summary,
      detail: detail,
      sticky: sticky,
    });
  }
}
