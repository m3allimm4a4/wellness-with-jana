import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicConfigService } from '../../services/dynamic-config.service';
import { Button } from 'primeng/button';
import { Editor } from 'primeng/editor';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-admin-bookings-configuration',
  imports: [CardModule, InputTextModule, ReactiveFormsModule, Button, Editor, Message],
  templateUrl: './admin-bookings-configuration.component.html',
  styleUrl: './admin-bookings-configuration.component.scss',
})
export class AdminBookingsConfigurationComponent implements OnInit {
  bookingConfigForm = new FormGroup({
    start: new FormControl<number>(0, [Validators.required]),
    end: new FormControl<number>(0, [Validators.required]),
    duration: new FormControl<number>(0, [Validators.required]),
    spacing: new FormControl<number>(0, [Validators.required]),
    emailSubject: new FormControl<string>('', [Validators.required]),
    emailTemplate: new FormControl<string>('', [Validators.required]),
    confirmationEmailSubject: new FormControl<string>('', [Validators.required]),
    confirmationEmailTemplate: new FormControl<string>('', [Validators.required]),
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
      this.bookingConfigForm.patchValue({
        start: config['start'],
        end: config['end'],
        duration: config['duration'],
        spacing: config['spacing'],
        emailSubject: config['email']?.subject,
        emailTemplate: config['email']?.template,
        confirmationEmailSubject: config['confirmationEmail']?.subject,
        confirmationEmailTemplate: config['confirmationEmail']?.template,
      });
    });
  }

  onBookingConfigSave() {
    this.dynamicConfigService
      .saveConfig('APPOINTMENT', {
        start: this.bookingConfigForm.value.start,
        end: this.bookingConfigForm.value.end,
        duration: this.bookingConfigForm.value.duration,
        spacing: this.bookingConfigForm.value.spacing,
        email: {
          subject: this.bookingConfigForm.value.emailSubject,
          template: this.bookingConfigForm.value.emailTemplate,
        },
        confirmationEmail: {
          subject: this.bookingConfigForm.value.confirmationEmailSubject,
          template: this.bookingConfigForm.value.confirmationEmailTemplate,
        },
      })
      .subscribe();
  }
}
