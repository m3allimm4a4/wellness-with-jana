import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Button } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs';
import { LabelsService } from '../../services/labels.service';

@Component({
  selector: 'app-admin-about-summary',
  imports: [CardModule, Button, EditorModule, FormsModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './admin-about-summary.component.html',
  styleUrl: './admin-about-summary.component.scss',
})
export class AdminAboutSummaryComponent implements OnInit, OnDestroy {
  summaryform = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    subtitle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  private subscription = new Subscription();

  constructor(private labelsService: LabelsService) {}

  ngOnInit() {
    this.subscription.add(
      this.labelsService.getLabels().subscribe(labels => {
        this.summaryform.patchValue({
          title: labels.get('about-summary-title'),
          subtitle: labels.get('about-summary-subtitle'),
          description: labels.get('about-summary-description'),
        });
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveSummary() {
    this.subscription.add(
      this.labelsService
        .createOrUpdateLabels([
          {
            name: 'about-summary-title',
            en: this.summaryform.controls.title.value,
          },
          {
            name: 'about-summary-subtitle',
            en: this.summaryform.controls.subtitle.value,
          },
          { name: 'about-summary-description', en: this.summaryform.controls.description.value },
        ])
        .subscribe(),
    );
  }
}
