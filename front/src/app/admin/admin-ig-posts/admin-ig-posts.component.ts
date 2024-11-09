import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { AssetComponent } from '../../shared/components/asset/asset.component';
import { Button } from 'primeng/button';
import { ConfirmationService, PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { IgPostsApiService } from '../../shared/services/ig-posts-api.service';
import { IgPost } from '../../shared/interfaces/ig-post.interface';

@Component({
  selector: 'app-admin-ig-posts',
  standalone: true,
  imports: [AssetComponent, Button, PrimeTemplate, TableModule, RouterLink],
  templateUrl: './admin-ig-posts.component.html',
  styleUrl: './admin-ig-posts.component.scss',
})
export class AdminIgPostsComponent implements OnInit, OnDestroy {
  igPosts = signal<IgPost[]>([]);

  private subscription = new Subscription();

  constructor(
    private confirmationService: ConfirmationService,
    private igPostsApiService: IgPostsApiService,
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.igPostsApiService.getIgPosts().subscribe(igPosts => {
        this.igPosts.set(igPosts);
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDeleteClick(id: string) {
    this.confirmationService.confirm({
      key: 'confirmDialog',
      message: 'Are you sure you want to delete this service?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.subscription.add(this.igPostsApiService.deleteIgPost(id).subscribe());
      },
    });
  }
}
