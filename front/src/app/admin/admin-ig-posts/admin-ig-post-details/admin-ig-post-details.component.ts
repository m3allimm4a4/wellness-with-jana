import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { iif, of, Subscription, switchMap, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IgPost } from '../../../shared/interfaces/ig-post.interface';
import { IgPostsApiService } from '../../../shared/services/ig-posts-api.service';

@Component({
  selector: 'app-admin-ig-post-details',
  imports: [Button, CardModule, FileUploadModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './admin-ig-post-details.component.html',
  styleUrl: './admin-ig-post-details.component.scss',
})
export class AdminIgPostDetailsComponent implements OnInit, OnDestroy {
  igPostForm = new FormGroup({
    url: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  igPost = signal<IgPost | undefined>(undefined);
  uploadUrl = computed(() => `${environment.apiUrl}/ig-posts/${this.igPost()?.id}`);

  private subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private igPostsApiService: IgPostsApiService,
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

            return iif(() => id === 'new', of<IgPost>({ url: '' }), this.igPostsApiService.getIgPost(id));
          }),
        )
        .subscribe(igPost => {
          this.igPost.set(igPost);
          this.igPostForm.patchValue({ url: igPost.url });
        }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveService() {
    if (!this.igPostForm.valid) {
      return;
    }

    const updatedPost: IgPost = { url: this.igPostForm.controls.url.value };

    if (this.igPost()?.id) {
      this.subscription.add(this.igPostsApiService.updateIgPost(this.igPost()?.id || '', updatedPost).subscribe());
      return;
    }

    this.subscription.add(
      this.igPostsApiService.createIgPost(updatedPost).subscribe(service => {
        this.igPost.set(service);
        this.router.navigateByUrl(this.router.url.replace('new', service?.id || 'new')).then();
      }),
    );
  }
}
