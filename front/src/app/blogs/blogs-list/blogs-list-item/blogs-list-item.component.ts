import { Component, computed, input } from '@angular/core';
import { Blog } from '../../../shared/interfaces/blog.interface';
import { AssetComponent } from '../../../shared/components/asset/asset.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blogs-list-item',
  imports: [AssetComponent, RouterLink],
  templateUrl: './blogs-list-item.component.html',
  styleUrl: './blogs-list-item.component.scss',
})
export class BlogsListItemComponent {
  blog = input<Blog | undefined>();

  protected summary = computed(() => {
    const contentString = this.blog()?.content;
    if (!contentString) {
      return '';
    }
    const parser = new DOMParser();
    const contentDoc = parser.parseFromString(contentString, 'text/html');
    return contentDoc.querySelector('p')?.innerHTML.slice(0, 140) + ' ...';
  });
}
