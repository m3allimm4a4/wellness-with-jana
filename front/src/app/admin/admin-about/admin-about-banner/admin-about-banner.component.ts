import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { Button } from 'primeng/button';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LabelsService } from '../../services/labels.service';
import { AssetUploaderComponent } from '../../../shared/components/asset-uploader/asset-uploader.component';

@Component({
  selector: 'app-admin-about-banner',
  imports: [CardModule, ReactiveFormsModule, EditorModule, Button, AssetUploaderComponent],
  templateUrl: './admin-about-banner.component.html',
  styleUrl: './admin-about-banner.component.scss',
})
export class AdminAboutBannerComponent implements OnInit, OnDestroy {
  bannerForm = new FormGroup({
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  url = `${environment.apiUrl}/assets/about/about-banner-background`;

  private subscription = new Subscription();

  constructor(private labelsService: LabelsService) {}

  ngOnInit() {
    this.subscription.add(
      this.labelsService.getLabels().subscribe(labels => {
        this.bannerForm.patchValue({
          description: labels.get('about-banner-description'),
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
        .createOrUpdateLabels([{ name: 'about-banner-description', en: this.bannerForm.controls.description.value }])
        .subscribe(),
    );
  }
}
