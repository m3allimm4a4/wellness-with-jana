import { Component, OnDestroy, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LabelsService } from '../../services/labels.service';

@Component({
  selector: 'app-admin-services-summary',
  standalone: true,
  imports: [Button, CardModule, EditorModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './admin-services-summary.component.html',
  styleUrl: './admin-services-summary.component.scss',
})
export class AdminServicesSummaryComponent implements OnInit, OnDestroy {
  summaryform = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  private subscription = new Subscription();

  constructor(private labelsService: LabelsService) {}

  ngOnInit() {
    this.subscription.add(
      this.labelsService.getLabels().subscribe(labels => {
        this.summaryform.patchValue({
          title: labels.get('services-summary-title'),
          description: labels.get('services-summary-description'),
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
            name: 'services-summary-title',
            en: this.summaryform.controls.title.value,
          },
          { name: 'services-summary-description', en: this.summaryform.controls.description.value },
        ])
        .subscribe(),
    );
  }
}
