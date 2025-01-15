import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Service } from '../../interfaces/service.interface';
import { BookingService } from '../../services/booking.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Timeslot } from '../../interfaces/timeslot.interface';
import { finalize } from 'rxjs';
import { Appointment } from '../../interfaces/appointment.interface';
import { Step, StepItem, StepPanel, Stepper } from 'primeng/stepper';
import { DatePickerModule } from 'primeng/datepicker';
import { Button } from 'primeng/button';
import { Timeline } from 'primeng/timeline';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { Divider } from 'primeng/divider';
import { Tooltip } from 'primeng/tooltip';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-booking',
  imports: [
    Stepper,
    StepItem,
    Step,
    StepPanel,
    DatePickerModule,
    Button,
    FormsModule,
    Timeline,
    DatePipe,
    ReactiveFormsModule,
    Divider,
    Tooltip,
    NgStyle,
    NgClass,
    FloatLabelModule,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements OnInit {
  private readonly config = inject(DynamicDialogConfig);
  private readonly deviceService = inject(DeviceDetectorService);
  private readonly bookingService = inject(BookingService);
  private readonly authService = inject(AuthService);

  protected readonly service: Service = this.config?.data?.service;
  protected readonly isMobile = this.deviceService.isMobile();
  protected readonly today = new Date();

  protected readonly user = signal<User | undefined>(undefined);
  protected readonly date = signal<Date | undefined>(undefined);
  protected readonly timeslots = signal<Timeslot[]>([]);
  protected readonly selectedTimeSlot = signal<Timeslot | undefined>(undefined);
  protected readonly isLoading = signal<boolean>(false);

  ngOnInit() {
    this.authService.getUser$().subscribe(user => this.user.set(user));
  }

  onDateConfirmed(callback: (tab: number) => void) {
    const day = this.date();
    if (!day) return;
    this.bookingService.getTimeslots(day).subscribe(timeslots => {
      this.timeslots.set(timeslots);
      callback(2);
    });
  }

  onBookingConfirmed() {
    this.isLoading.set(true);
    const appointment: Partial<Appointment> = {
      start: this.selectedTimeSlot()?.start || new Date(),
      end: this.selectedTimeSlot()?.end || new Date(),
      service: this.service,
    };
    this.bookingService
      .confirmBooking(appointment)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe();
  }

  toggleTimeslot(timeslot: Timeslot) {
    if (timeslot.reserved) {
      return;
    }
    if (timeslot === this.selectedTimeSlot()) {
      this.selectedTimeSlot.set(undefined);
      return;
    }
    this.selectedTimeSlot.set(timeslot);
  }
}
