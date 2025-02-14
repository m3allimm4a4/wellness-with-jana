import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { LabelsService } from '../../services/labels.service';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { AssetUploaderComponent } from '../../../shared/components/asset-uploader/asset-uploader.component';

@Component({
  selector: 'app-admin-services-banner',
  imports: [Button, CardModule, EditorModule, InputTextModule, ReactiveFormsModule, AssetUploaderComponent],
  templateUrl: './admin-services-banner.component.html',
  styleUrl: './admin-services-banner.component.scss',
})
export class AdminServicesBannerComponent implements OnInit, OnDestroy {
  bannerForm = new FormGroup({
    title1: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    title2: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  url = `${environment.apiUrl}/assets/services/services-banner-background`;

  private subscription = new Subscription();

  constructor(private labelsService: LabelsService) {}

  ngOnInit() {
    this.subscription.add(
      this.labelsService.getLabels().subscribe(labels => {
        this.bannerForm.patchValue({
          title1: labels.get('services-banner-title-1'),
          title2: labels.get('services-banner-title-2'),
          description: labels.get('services-banner-description'),
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
            name: 'services-banner-title-1',
            en: this.bannerForm.controls.title1.value,
          },
          {
            name: 'services-banner-title-2',
            en: this.bannerForm.controls.title2.value,
          },
          { name: 'services-banner-description', en: this.bannerForm.controls.description.value },
        ])
        .subscribe(),
    );
  }
}
