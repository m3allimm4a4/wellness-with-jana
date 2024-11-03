import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, iif, map, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';
import { Testemonial } from '../interfaces/testemonial.interface';

@Injectable({ providedIn: 'root' })
export class TestemonialsApiService {
  private loaded = false;
  private testemonials = new BehaviorSubject<Testemonial[]>([]);

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  public getTestemonials() {
    return iif(() => this.loaded, this.testemonials.asObservable(), this.refreshTestemonials());
  }

  private refreshTestemonials() {
    return this.http.get<Testemonial[]>(`${environment.apiUrl}/testemonials`).pipe(
      switchMap(services => {
        this.loaded = true;
        this.testemonials.next(services);
        return this.testemonials.asObservable();
      }),
    );
  }

  public getTestemonial(id: string) {
    return this.http.get<Testemonial>(`${environment.apiUrl}/testemonials/${id}`);
  }

  public createTestemonial(service: Testemonial) {
    return this.http.post<Testemonial>(`${environment.apiUrl}/testemonials`, service).pipe(
      tap(() => {
        this.createSuccessToast('Testemonial created successfully');
        this.invalidateCache();
      }),
    );
  }

  public updateTestemonial(id: string, service: Testemonial) {
    return this.http.put<Testemonial>(`${environment.apiUrl}/testemonials/${id}`, service).pipe(
      tap(() => {
        this.createSuccessToast('Testemonial updated successfully');
        this.invalidateCache();
      }),
    );
  }

  public deleteTestemonial(id: string) {
    return this.http.delete<void>(`${environment.apiUrl}/testemonials/${id}`).pipe(
      switchMap(() => this.refreshTestemonials()),
      tap(() => this.createSuccessToast('Testemonial deleted successfully !')),
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
      this.testemonials.next([]);
    }
  }
}
