import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../interfaces/blog.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BlogApiService {
  private readonly http = inject(HttpClient);

  getBlogs() {
    return this.http.get<Blog[]>(`${environment.apiUrl}/blogs`);
  }

  getBlogById(id: string) {
    return this.http.get<Blog>(`${environment.apiUrl}/blogs/${id}`);
  }

  addBlog(blog: Blog) {
    return this.http.post<Blog>(`${environment.apiUrl}/blogs`, blog);
  }

  updateBlog(blog: Blog) {
    return this.http.put<Blog>(`${environment.apiUrl}/blogs`, blog);
  }

  updateBlogContent(content: string) {
    return this.http.patch<Blog>(`${environment.apiUrl}/blogs`, { content });
  }

  getContentImageUploadUrl(id: string) {
    return `${environment.apiUrl}/blogs/${id}/assets`;
  }
}
