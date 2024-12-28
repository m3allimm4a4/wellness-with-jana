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
import { Timeslot } from '../../interfaces/timeslot.interface';
import { TooltipModule } from 'primeng/tooltip';
import { finalize } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { getCountryOptions } from '../../constants/countries';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { Appointment } from '../../interfaces/appointment.interface';

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
  readonly today = new Date();

  infoForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    lastname: new FormControl<string | null>(null, [Validators.required]),
    country: new FormControl<string | null>(null, [Validators.required]),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    phone: new FormControl<string | null>(null, [Validators.required]),
  });

  date = signal<Date | null>(null);
  timeslots = signal<Timeslot[]>([]);
  selectedTimeSlot = signal<Timeslot | undefined>(undefined);
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
    const day = this.date();
    if (!day) return;
    this.bookingService.getTimeslots(day).subscribe(timeslots => {
      this.timeslots.set(timeslots);
      callback.emit();
    });
  }

  onTimeConfirmed(callback: EventEmitter<void>) {
    callback.emit();
  }

  onInfoConfirmed(callback: EventEmitter<void>) {
    callback.emit();
  }

  onBookingConfirmed() {
    this.isLoading.set(true);
    const appointment: Appointment = {
      start: this.selectedTimeSlot()?.start || new Date(),
      end: this.selectedTimeSlot()?.end || new Date(),
      country: this.infoForm.controls.country.value || '',
      email: this.infoForm.controls.email.value || '',
      phone: this.infoForm.controls.phone.value || '',
      name: this.infoForm.controls.name.value || '',
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
