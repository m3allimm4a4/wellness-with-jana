import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Service } from '../../interfaces/service.interface';
import { BookingService } from '../../services/booking.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Timeslot } from '../../interfaces/timeslot.interface';
import { finalize } from 'rxjs';
import { getCountryOptions } from '../../constants/countries';
import { Appointment } from '../../interfaces/appointment.interface';
import { Step, StepItem, StepPanel, Stepper } from 'primeng/stepper';
import { DatePickerModule } from 'primeng/datepicker';
import { Button } from 'primeng/button';
import { Timeline } from 'primeng/timeline';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { Divider } from 'primeng/divider';
import { Tooltip } from 'primeng/tooltip';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';

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
    InputText,
    Select,
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
    const appointment: Appointment = {
      start: this.selectedTimeSlot()?.start || new Date(),
      end: this.selectedTimeSlot()?.end || new Date(),
      country: this.infoForm.controls.country.value || '',
      email: this.infoForm.controls.email.value || '',
      phone: this.infoForm.controls.phone.value || '',
      name: (this.infoForm.controls.name.value || '') + (this.infoForm.controls.lastname.value || ''),
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
