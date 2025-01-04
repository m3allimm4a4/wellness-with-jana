import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { Service } from '../../../shared/interfaces/service.interface';
import { iif, of, Subscription, switchMap, throwError } from 'rxjs';
import { ServicesApiService } from '../../../shared/services/services-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { ChipsModule } from 'primeng/chips';
import { CheckboxModule } from 'primeng/checkbox';
import { Button } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-testemonials-details',
  imports: [
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    EditorModule,
    ChipsModule,
    CheckboxModule,
    Button,
    FileUploadModule,
  ],
  templateUrl: './admin-services-details.component.html',
  styleUrl: './admin-services-details.component.scss',
})
export class AdminServicesDetailsComponent implements OnInit, OnDestroy {
  serviceForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
    showOnHome: new FormControl<boolean>(false, { nonNullable: true }),
    checkList: new FormControl<string[]>([], { nonNullable: true }),
  });

  service = signal<Service | undefined>(undefined);
  uploadUrl = computed(() => `${environment.apiUrl}/services/${this.service()?.id}`);

  private subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private servicesApiService: ServicesApiService,
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
              of<Service>({
                name: '',
                title: '',
                description: '',
                price: 0,
                tags: [],
                checkList: [],
              }),
              this.servicesApiService.getService(id),
            );
          }),
        )
        .subscribe(service => {
          this.service.set(service);
          this.serviceForm.patchValue({
            name: service.name,
            title: service.title,
            description: service.description,
            price: service.price,
            checkList: service.checkList,
            showOnHome: service.tags.includes('home'),
          });
        }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveService() {
    if (!this.serviceForm.valid) {
      return;
    }
    let tags = this.service()?.tags || [];
    if (this.serviceForm.controls.showOnHome.value && !tags.includes('home')) {
      tags.push('home');
    }
    if (!this.serviceForm.controls.showOnHome.value) {
      tags = tags.filter(t => t !== 'home');
    }
    const updatedService: Service = {
      name: this.serviceForm.controls.name.value,
      title: this.serviceForm.controls.title.value,
      description: this.serviceForm.controls.description.value,
      price: this.serviceForm.controls.price.value,
      checkList: this.serviceForm.controls.checkList.value,
      tags: tags,
    };

    if (this.service()?.id) {
      this.subscription.add(
        this.servicesApiService.updateService(this.service()?.id || '', updatedService).subscribe(),
      );
      return;
    }

    this.subscription.add(
      this.servicesApiService.createService(updatedService).subscribe(service => {
        this.service.set(service);
        this.router.navigateByUrl(this.router.url.replace('new', service?.id || 'new')).then();
      }),
    );
  }
}
