import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LabelsService } from '../../services/labels.service';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-admin-home-trial',
  imports: [Button, CardModule, EditorModule, FormsModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './admin-home-trial.component.html',
  styleUrl: './admin-home-trial.component.scss',
})
export class AdminHomeTrialComponent implements OnInit, OnDestroy {
  trialForm = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  private subscription = new Subscription();

  constructor(private labelsService: LabelsService) {}

  ngOnInit() {
    this.subscription.add(
      this.labelsService.getLabels().subscribe(labels => {
        this.trialForm.patchValue({
          title: labels.get('home-trial-title'),
          description: labels.get('home-trial-description'),
        });
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveTrial() {
    this.subscription.add(
      this.labelsService
        .createOrUpdateLabels([
          { name: 'home-trial-title', en: this.trialForm.controls.title.value },
          { name: 'home-trial-description', en: this.trialForm.controls.description.value },
        ])
        .subscribe(),
    );
  }
}
