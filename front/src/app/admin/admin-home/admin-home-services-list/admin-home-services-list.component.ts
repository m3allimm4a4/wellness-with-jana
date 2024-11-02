import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Button } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LabelsService } from '../../services/labels.service';

@Component({
  selector: 'app-admin-home-services-list',
  standalone: true,
  imports: [CardModule, Button, EditorModule, InputTextModule, PaginatorModule, ReactiveFormsModule],
  templateUrl: './admin-home-services-list.component.html',
  styleUrl: './admin-home-services-list.component.scss',
})
export class AdminHomeServicesListComponent implements OnInit, OnDestroy {
  servicesListForm = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  private subscription = new Subscription();

  constructor(private labelsService: LabelsService) {}

  ngOnInit() {
    this.subscription.add(
      this.labelsService.getLabels().subscribe(labels => {
        this.servicesListForm.patchValue({
          title: labels.get('home-services-list-title'),
          description: labels.get('home-services-list-description'),
        });
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveServicesList() {
    this.subscription.add(
      this.labelsService
        .createOrUpdateLabels([
          { name: 'home-services-list-title', en: this.servicesListForm.controls.title.value },
          { name: 'home-services-list-description', en: this.servicesListForm.controls.description.value },
        ])
        .subscribe(),
    );
  }
}
