import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicConfigService } from '../../services/dynamic-config.service';

@Component({
  selector: 'app-admin-bookings-configuration',
  standalone: true,
  imports: [CardModule, InputTextModule, ReactiveFormsModule],
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
    this.dynamicConfigService.getConfigByName('APPOINTMENT').subscribe(config => {
      this.bookingConfigForm.patchValue(config);
    });
  }
}
