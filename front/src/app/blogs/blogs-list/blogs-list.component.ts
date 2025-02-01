import { Component, computed, inject, resource } from '@angular/core';
import { BlogApiService } from '../../shared/services/blog-api.service';
import { firstValueFrom } from 'rxjs';
import { BlogsListItemComponent } from './blogs-list-item/blogs-list-item.component';

@Component({
  selector: 'app-blogs-list',
  imports: [BlogsListItemComponent],
  templateUrl: './blogs-list.component.html',
  styleUrl: './blogs-list.component.scss',
})
export class BlogsListComponent {
  private readonly blogApiService = inject(BlogApiService);
  private readonly blogsResource = resource({
    loader: () => firstValueFrom(this.blogApiService.getBlogs()),
  });

  protected readonly blogs = computed(() => this.blogsResource.value());
}
