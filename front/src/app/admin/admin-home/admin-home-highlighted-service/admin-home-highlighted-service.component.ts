import { Component, OnDestroy, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LabelsService } from '../../services/labels.service';
import { EditorModule } from 'primeng/editor';
import { environment } from '../../../../environments/environment';
import { AssetUploaderComponent } from '../../../shared/components/asset-uploader/asset-uploader.component';

@Component({
  selector: 'app-admin-home-highlighted-service',
  imports: [Button, CardModule, InputTextModule, ReactiveFormsModule, EditorModule, AssetUploaderComponent],
  templateUrl: './admin-home-highlighted-service.component.html',
  styleUrl: './admin-home-highlighted-service.component.scss',
})
export class AdminHomeHighlightedServiceComponent implements OnInit, OnDestroy {
  highlightedServiceForm = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  url = `${environment.apiUrl}/assets/home/home-highlighted-service`;

  private subscription = new Subscription();

  constructor(private labelsService: LabelsService) {}

  ngOnInit() {
    this.subscription.add(
      this.labelsService.getLabels().subscribe(labels => {
        this.highlightedServiceForm.patchValue({
          title: labels.get('home-highlighted-service-title'),
          description: labels.get('home-highlighted-service-description'),
        });
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveHighlightedService() {
    this.subscription.add(
      this.labelsService
        .createOrUpdateLabels([
          {
            name: 'home-highlighted-service-title',
            en: this.highlightedServiceForm.controls.title.value,
          },
          { name: 'home-highlighted-service-description', en: this.highlightedServiceForm.controls.description.value },
        ])
        .subscribe(),
    );
  }
}
