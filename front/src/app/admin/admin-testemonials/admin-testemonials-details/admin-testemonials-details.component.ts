import { Component, OnDestroy, OnInit } from '@angular/core';
import { iif, of, Subscription, switchMap, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { Button } from 'primeng/button';
import { Testemonial } from '../../../shared/interfaces/testemonial.interface';
import { TestemonialsApiService } from '../../../shared/services/testemonials-api.service';
import { getCountryOptions } from '../../../shared/constants/countries';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-admin-testemonials-details',
  imports: [CardModule, ReactiveFormsModule, InputTextModule, CheckboxModule, Button, Select],
  templateUrl: './admin-testemonials-details.component.html',
  styleUrl: './admin-testemonials-details.component.scss',
})
export class AdminTestemonialsDetailsComponent implements OnInit, OnDestroy {
  countryOptions = getCountryOptions();

  testemonialForm = new FormGroup({
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    city: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    country: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    clientName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    showOnHome: new FormControl<boolean>(false, { nonNullable: true }),
  });

  private testemonial: Testemonial | undefined;
  private subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private testemonialsApiService: TestemonialsApiService,
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.paramMap
        .pipe(
          switchMap(params => {
            const id = params.get('id');
            if (!id) {
              return throwError(() => new Error('Missing ID'));
            }

            return iif(
              () => id === 'new',
              of<Testemonial>({
                description: '',
                city: '',
                clientName: '',
                country: '',
                tags: [],
              }),
              this.testemonialsApiService.getTestemonial(id),
            );
          }),
        )
        .subscribe(testemonial => {
          this.testemonial = testemonial;
          this.testemonialForm.patchValue({
            description: testemonial.description,
            city: testemonial.city,
            clientName: testemonial.clientName,
            country: testemonial.country,
            showOnHome: testemonial.tags.includes('home'),
          });
        }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveTestemonial() {
    if (!this.testemonialForm.valid) {
      return;
    }
    let tags = this.testemonial?.tags || [];
    if (this.testemonialForm.controls.showOnHome.value && !tags.includes('home')) {
      tags.push('home');
    }
    if (!this.testemonialForm.controls.showOnHome.value) {
      tags = tags.filter(t => t !== 'home');
    }
    const updatedTestemonial: Testemonial = {
      description: this.testemonialForm.controls.description.value,
      city: this.testemonialForm.controls.city.value,
      country: this.testemonialForm.controls.country.value,
      clientName: this.testemonialForm.controls.clientName.value,
      tags: tags,
    };

    if (this.testemonial?.id) {
      this.subscription.add(
        this.testemonialsApiService.updateTestemonial(this.testemonial.id, updatedTestemonial).subscribe(),
      );
      return;
    }

    this.subscription.add(
      this.testemonialsApiService.createTestemonial(updatedTestemonial).subscribe(testemonial => {
        this.testemonial = testemonial;
        this.router.navigateByUrl(this.router.url.replace('new', testemonial?.id || 'new')).then();
      }),
    );
  }
}
