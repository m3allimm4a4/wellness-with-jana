import { Component, OnDestroy, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EditorModule } from 'primeng/editor';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs';
import { LabelsService } from '../../services/labels.service';
import { environment } from '../../../../environments/environment';
import { AssetUploaderComponent } from '../../../shared/components/asset-uploader/asset-uploader.component';

@Component({
  selector: 'app-admin-home-marketing-message',
  imports: [
    Button,
    CardModule,
    EditorModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    AssetUploaderComponent,
  ],
  templateUrl: './admin-home-marketing-message.component.html',
  styleUrl: './admin-home-marketing-message.component.scss',
})
export class AdminHomeMarketingMessageComponent implements OnInit, OnDestroy {
  marketingForm = new FormGroup({
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  url = `${environment.apiUrl}/assets/home/home-marketing-background`;

  private subscription = new Subscription();

  constructor(private labelsService: LabelsService) {}

  ngOnInit() {
    this.subscription.add(
      this.labelsService.getLabels().subscribe(labels => {
        this.marketingForm.patchValue({
          description: labels.get('home-marketing-description'),
        });
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveMarketingMessage() {
    this.subscription.add(
      this.labelsService
        .createOrUpdateLabels([
          { name: 'home-marketing-description', en: this.marketingForm.controls.description.value },
        ])
        .subscribe(),
    );
  }
}
