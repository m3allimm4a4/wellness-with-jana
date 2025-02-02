import { Component, computed, ElementRef, input, viewChild } from '@angular/core';
import { Blog } from '../../../shared/interfaces/blog.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-details-content',
  imports: [DatePipe],
  templateUrl: './blog-details-content.component.html',
  styleUrl: './blog-details-content.component.scss',
})
export class BlogDetailsContentComponent {
  blog = input<Blog>();

  navItems = computed(() => {
    const result: string[] = [this.blog()?.title || ''];
    const content = this.blog()?.content;
    if (!content) {
      return result;
    }
    const domParser = new DOMParser();
    const contentDom = domParser.parseFromString(content, 'text/html');
    const headers = contentDom.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headers?.length) {
      result.push(...Array.from(headers).map(e => e.innerHTML));
    }
    return result;
  });

  titleElement = viewChild<ElementRef<HTMLHeadElement>>('titleElement');
  contentElement = viewChild<ElementRef<HTMLHeadElement>>('contentElement');

  scrollToHeader(index: number) {
    if (index === 0) {
      this.titleElement()?.nativeElement.scrollIntoView();
      return;
    }
    const headers = this.contentElement()?.nativeElement.querySelectorAll('h1, h2, h3, h4, h5, h6') || [];
    if (!headers?.length) return;
    headers[index - 1].scrollIntoView();
  }
}
