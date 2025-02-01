import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Blog } from '../interfaces/blog.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BlogApiService {
  private readonly http = inject(HttpClient);

  getBlogs(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit) {
      params = params.append('limit', limit);
    }
    if (offset) {
      params = params.append('offset', offset);
    }
    return this.http.get<Blog[]>(`${environment.apiUrl}/blogs`, { params: params });
  }

  getBlogById(id: string) {
    return this.http.get<Blog>(`${environment.apiUrl}/blogs/${id}`);
  }

  addBlog(blog: Blog) {
    return this.http.post<Blog>(`${environment.apiUrl}/blogs`, blog);
  }

  patchBlog(id: string, blog: Partial<Blog>) {
    return this.http.patch<Blog>(`${environment.apiUrl}/blogs/${id}`, blog);
  }

  getContentImageUploadUrl(id: string) {
    return `${environment.apiUrl}/blogs/${id}/assets`;
  }

  deleteBlog(id: string) {
    return this.http.delete<void>(`${environment.apiUrl}/blogs/${id}`);
  }
}
