import { Component, EventEmitter, signal } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { CalendarModule } from 'primeng/calendar';
import { TimelineModule } from 'primeng/timeline';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { Service } from '../../interfaces/service.interface';
import { BookingService } from '../../services/booking.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ITimeslot } from '../../interfaces/timeslot.interface';
import { TooltipModule } from 'primeng/tooltip';
import { finalize } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { getCountryOptions } from '../../constants/countries';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    StepperModule,
    CalendarModule,
    TimelineModule,
    FormsModule,
    DatePipe,
    NgClass,
    NgStyle,
    TooltipModule,
    InputTextModule,
    DropdownModule,
    FloatLabelModule,
    ReactiveFormsModule,
    DividerModule,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {
  readonly service: Service;
  readonly isMobile: boolean;
  readonly countryOptions = getCountryOptions();

  infoForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    lastname: new FormControl<string | null>(null, [Validators.required]),
    country: new FormControl<string | null>(null, [Validators.required]),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    phone: new FormControl<string | null>(null, [Validators.required]),
  });

  date = signal<Date | null>(null);
  timeslots = signal<ITimeslot[]>([
    { date: new Date(), reserved: true },
    {
      date: new Date(),
      reserved: false,
    },
    { date: new Date(), reserved: true },
    { date: new Date(), reserved: false },
    {
      date: new Date(),
      reserved: false,
    },
    { date: new Date(), reserved: false },
  ]);
  selectedTimeSlot = signal<ITimeslot | undefined>(undefined);
  isLoading = signal<boolean>(false);

  constructor(
    config: DynamicDialogConfig,
    deviceService: DeviceDetectorService,
    private bookingService: BookingService,
  ) {
    this.service = config?.data?.service;
    this.isMobile = deviceService.isMobile();
  }

  onDateConfirmed(callback: EventEmitter<void>) {
    callback.emit();
  }

  onTimeConfirmed(callback: EventEmitter<void>) {
    callback.emit();
  }

  onInfoConfirmed(callback: EventEmitter<void>) {
    callback.emit();
  }

  onBookingConfirmed() {
    this.isLoading.set(true);
    this.bookingService
      .confirmBooking(this.service)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe();
  }

  toggleTimeslot(timeslot: ITimeslot) {
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
