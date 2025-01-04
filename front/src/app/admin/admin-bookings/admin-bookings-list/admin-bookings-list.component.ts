import { Component, inject, OnInit, signal } from '@angular/core';
import { BookingService } from '../../../shared/services/booking.service';
import { Appointment } from '../../../shared/interfaces/appointment.interface';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { Tooltip } from 'primeng/tooltip';
import { SelectButton } from 'primeng/selectbutton';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-admin-bookings-list',
  imports: [TableModule, DatePipe, FormsModule, Button, Tooltip, SelectButton],
  templateUrl: './admin-bookings-list.component.html',
  styleUrl: './admin-bookings-list.component.scss',
})
export class AdminBookingsListComponent implements OnInit {
  private readonly bookingService = inject(BookingService);
  private readonly confirmationService = inject(ConfirmationService);

  showHistory = signal<boolean>(false);
  showHistoryOptions = signal([
    { label: 'Upcoming', value: false },
    { label: 'Passed', value: true },
  ]);

  appointments = signal<Appointment[]>([]);
  appointmentsLoading = signal<boolean>(false);

  ngOnInit() {
    this.showHistoryChange(this.showHistory());
  }

  showHistoryChange(showHistory: boolean) {
    this.appointmentsLoading.set(true);
    this.bookingService
      .getAppointments(showHistory)
      .pipe(finalize(() => this.appointmentsLoading.set(false)))
      .subscribe(appointments => this.appointments.set(appointments));
  }

  confirmBooking(booking: Appointment) {
    this.confirmationService.confirm({
      key: 'confirmDialog',
      message: 'Are you sure you want to confirm this booking? This action cannot be undone.',
      rejectButtonStyleClass: 'p-button-danger',
      header: 'Confirmation',
      accept: () => {
        this.bookingService.adminConfirmBooking(booking).subscribe(() => {
          this.appointments.update(appointments =>
            appointments.map(a => ({
              ...a,
              confirmed: a.id === booking.id ? true : a.confirmed,
            })),
          );
        });
      },
    });
  }

  cancelBooking(booking: Appointment) {
    this.confirmationService.confirm({
      key: 'confirmDialog',
      message: 'Are you sure you want to cancel this booking? This action cannot be undone.',
      rejectButtonStyleClass: 'p-button-danger',
      header: 'Confirmation',
      accept: () => {
        this.bookingService.adminCancelBooking(booking).subscribe(() => {
          this.appointments.update(appointments => appointments.filter(a => a.id !== booking.id));
        });
      },
    });
  }
}
