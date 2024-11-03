import { Component, OnDestroy, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EditorModule } from 'primeng/editor';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs';
import { LabelsService } from '../../services/labels.service';

@Component({
  selector: 'app-admin-home-highlighted-guide',
  standalone: true,
  imports: [Button, CardModule, EditorModule, FormsModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './admin-home-highlighted-guide.component.html',
  styleUrl: './admin-home-highlighted-guide.component.scss',
})
export class AdminHomeHighlightedGuideComponent implements OnInit, OnDestroy {
  guideForm = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  private subscription = new Subscription();

  constructor(private labelsService: LabelsService) {}

  ngOnInit() {
    this.subscription.add(
      this.labelsService.getLabels().subscribe(labels => {
        this.guideForm.patchValue({
          title: labels.get('home-guide-title'),
          description: labels.get('home-guide-description'),
        });
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveGuide() {
    this.subscription.add(
      this.labelsService
        .createOrUpdateLabels([
          { name: 'home-guide-title', en: this.guideForm.controls.title.value },
          { name: 'home-guide-description', en: this.guideForm.controls.description.value },
        ])
        .subscribe(),
    );
  }
}
