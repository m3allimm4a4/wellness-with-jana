import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LabelsService } from '../../services/labels.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { environment } from '../../../../environments/environment';
import { AssetUploaderComponent } from '../../../shared/components/asset-uploader/asset-uploader.component';

@Component({
  selector: 'app-admin-home-banner',
  imports: [Button, CardModule, InputTextModule, ReactiveFormsModule, EditorModule, AssetUploaderComponent],
  templateUrl: './admin-home-banner.component.html',
  styleUrl: './admin-home-banner.component.scss',
})
export class AdminHomeBannerComponent implements OnInit, OnDestroy {
  bannerForm = new FormGroup({
    title1: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    title2: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  url = `${environment.apiUrl}/assets/home/home-banner-background`;

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
