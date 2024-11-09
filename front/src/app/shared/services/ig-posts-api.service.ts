import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, iif, map, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';
import { IgPost } from '../interfaces/ig-post.interface';

@Injectable({ providedIn: 'root' })
export class IgPostsApiService {
  private loaded = false;
  private igPosts = new BehaviorSubject<IgPost[]>([]);

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  public getIgPosts() {
    return iif(() => this.loaded, this.igPosts.asObservable(), this.refreshServices());
  }

  private refreshServices() {
    return this.http.get<IgPost[]>(`${environment.apiUrl}/ig-posts`).pipe(
      switchMap(services => {
        this.loaded = true;
        this.igPosts.next(services);
        return this.igPosts.asObservable();
      }),
    );
  }

  public getIgPost(id: string) {
    return this.http.get<IgPost>(`${environment.apiUrl}/ig-posts/${id}`);
  }

  public createIgPost(service: IgPost) {
    return this.http.post<IgPost>(`${environment.apiUrl}/ig-posts`, service).pipe(
      tap(() => {
        this.createSuccessToast('Service created successfully');
        this.invalidateCache();
      }),
    );
  }

  public updateIgPost(id: string, service: IgPost) {
    return this.http.put<IgPost>(`${environment.apiUrl}/ig-posts/${id}`, service).pipe(
      tap(() => {
        this.createSuccessToast('Service updated successfully');
        this.invalidateCache();
      }),
    );
  }

  public deleteIgPost(id: string) {
    return this.http.delete<void>(`${environment.apiUrl}/ig-posts/${id}`).pipe(
      switchMap(() => this.refreshServices()),
      tap(() => this.createSuccessToast('Service deleted successfully !')),
      map(() => of(null)),
    );
  }

  private createSuccessToast(message: string): void {
    this.messageService.add({
      key: 'toast',
      severity: 'success',
      summary: message,
    });
  }

  private invalidateCache() {
    if (this.loaded) {
      this.loaded = false;
      this.igPosts.next([]);
    }
  }
}
