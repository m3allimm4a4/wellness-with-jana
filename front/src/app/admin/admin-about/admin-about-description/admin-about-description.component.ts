import { Component, OnDestroy, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EditorModule } from 'primeng/editor';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs';
import { LabelsService } from '../../services/labels.service';
import { FileUploadModule } from 'primeng/fileupload';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-about-description',
  imports: [Button, CardModule, EditorModule, FormsModule, InputTextModule, ReactiveFormsModule, FileUploadModule],
  templateUrl: './admin-about-description.component.html',
  styleUrl: './admin-about-description.component.scss',
})
export class AdminAboutDescriptionComponent implements OnInit, OnDestroy {
  descriptionForm = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  url = `${environment.apiUrl}/assets/about/about-description`;

  private subscription = new Subscription();

  constructor(private labelsService: LabelsService) {}

  ngOnInit() {
    this.subscription.add(
      this.labelsService.getLabels().subscribe(labels => {
        this.descriptionForm.patchValue({
          title: labels.get('about-description-title'),
          description: labels.get('about-description-description'),
        });
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveDescription() {
    this.subscription.add(
      this.labelsService
        .createOrUpdateLabels([
          {
            name: 'about-description-title',
            en: this.descriptionForm.controls.title.value,
          },
          { name: 'about-description-description', en: this.descriptionForm.controls.description.value },
        ])
        .subscribe(),
    );
  }
}
