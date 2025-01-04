import { Component, OnDestroy, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LabelsService } from '../../services/labels.service';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-admin-home-summary',
  imports: [Button, CardModule, InputTextModule, ReactiveFormsModule, EditorModule],
  templateUrl: './admin-home-summary.component.html',
  styleUrl: './admin-home-summary.component.scss',
})
export class AdminHomeSummaryComponent implements OnInit, OnDestroy {
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
          title: labels.get('home-summary-title'),
          subtitle: labels.get('home-summary-subtitle'),
          description: labels.get('home-summary-description'),
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
            name: 'home-summary-title',
            en: this.summaryform.controls.title.value,
          },
          {
            name: 'home-summary-subtitle',
            en: this.summaryform.controls.subtitle.value,
          },
          { name: 'home-summary-description', en: this.summaryform.controls.description.value },
        ])
        .subscribe(),
    );
  }
}
