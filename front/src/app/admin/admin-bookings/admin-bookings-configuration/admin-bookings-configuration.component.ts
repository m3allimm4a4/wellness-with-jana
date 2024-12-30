import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicConfigService } from '../../services/dynamic-config.service';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-admin-bookings-configuration',
  standalone: true,
  imports: [CardModule, InputTextModule, ReactiveFormsModule, Button],
  templateUrl: './admin-bookings-configuration.component.html',
  styleUrl: './admin-bookings-configuration.component.scss',
})
export class AdminBookingsConfigurationComponent implements OnInit {
  bookingConfigForm = new FormGroup({
    start: new FormControl<number>(0, [Validators.required]),
    end: new FormControl<number>(0, [Validators.required]),
    duration: new FormControl<number>(0, [Validators.required]),
    spacing: new FormControl<number>(0, [Validators.required]),
  });

  constructor(private dynamicConfigService: DynamicConfigService) {}

  ngOnInit() {
    this.bookingConfigForm.controls.start.valueChanges.subscribe(start => {
      const validators = [Validators.required];
      if (start) {
        validators.push(control => (control.value < start ? { error: 'invalid' } : null));
      }
      this.bookingConfigForm.controls.end.setValidators(validators);
    });
    this.bookingConfigForm.controls.end.valueChanges.subscribe(end => {
      const validators = [Validators.required];
      if (end) {
        validators.push(control => (control.value > end ? { error: 'invalid' } : null));
      }
      this.bookingConfigForm.controls.start.setValidators(validators);
    });
    this.dynamicConfigService.getConfigByName('APPOINTMENT').subscribe(config => {
      this.bookingConfigForm.patchValue(config);
    });
  }

  onBookingConfigSave() {
    this.dynamicConfigService
      .saveConfig('APPOINTMENT', {
        start: this.bookingConfigForm.value.start,
        end: this.bookingConfigForm.value.end,
        duration: this.bookingConfigForm.value.duration,
        spacing: this.bookingConfigForm.value.spacing,
      })
      .subscribe();
  }
}
