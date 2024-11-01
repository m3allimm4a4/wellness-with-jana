import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LabelsService } from '../services/labels.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CardModule, InputTextModule, Button, ReactiveFormsModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss',
})
export class AdminHomeComponent implements OnInit, OnDestroy {
  bannerForm = new FormGroup({
    title1: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    title2: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  private subscription = new Subscription();

  constructor(private labelsService: LabelsService) {}

  ngOnInit() {
    this.subscription.add(
      this.labelsService.getLabels().subscribe(labels => {
        this.bannerForm.patchValue({
          title1: labels.get('home-banner-title-1'),
          title2: labels.get('home-banner-title-2'),
          description: labels.get('home-banner-description'),
        });
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveBanner() {
    this.subscription.add(
      this.labelsService
        .createOrUpdateLabels([
          {
            name: 'home-banner-title-1',
            en: this.bannerForm.controls.title1.value,
          },
          {
            name: 'home-banner-title-2',
            en: this.bannerForm.controls.title2.value,
          },
          { name: 'home-banner-description', en: this.bannerForm.controls.description.value },
        ])
        .subscribe(),
    );
  }
}
