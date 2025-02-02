import { Component, computed, input } from '@angular/core';
import { Blog } from '../../../shared/interfaces/blog.interface';
import { BlogsListItemComponent } from '../../blogs-list/blogs-list-item/blogs-list-item.component';

@Component({
  selector: 'app-blog-details-related',
  imports: [BlogsListItemComponent],
  templateUrl: './blog-details-related.component.html',
  styleUrl: './blog-details-related.component.scss',
})
export class BlogDetailsRelatedComponent {
  blog = input<Blog>();
  related = computed<Blog[]>(() => (this.blog()?.related || []) as Blog[]);
}
