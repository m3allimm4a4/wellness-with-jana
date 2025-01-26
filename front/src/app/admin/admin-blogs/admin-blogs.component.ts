import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { AssetComponent } from '../../shared/components/asset/asset.component';
import { Button } from 'primeng/button';
import { BlogApiService } from '../../shared/services/blog-api.service';
import { Blog } from '../../shared/interfaces/blog.interface';
import { ConfirmationService } from 'primeng/api';
import { Subscription, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-admin-blogs',
  imports: [RouterLink, TableModule, AssetComponent, Button],
  templateUrl: './admin-blogs.component.html',
  styleUrl: './admin-blogs.component.scss',
})
export class AdminBlogsComponent implements OnInit, OnDestroy {
  private readonly confirmationService = inject(ConfirmationService);
  private readonly blogApiService = inject(BlogApiService);
  private readonly subscription = new Subscription();

  protected readonly blogs = signal<Blog[]>([]);

  ngOnInit() {
    this.subscription.add(this.fetchBlogs().subscribe());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDeleteClick(id: string) {
    this.confirmationService.confirm({
      key: 'confirmDialog',
      message: 'Are you sure you want to delete this blog?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.subscription.add(
          this.blogApiService
            .deleteBlog(id)
            .pipe(switchMap(() => this.fetchBlogs()))
            .subscribe(),
        );
      },
    });
  }

  private fetchBlogs() {
    return this.blogApiService.getBlogs().pipe(tap(blogs => this.blogs.set(blogs)));
  }
}
