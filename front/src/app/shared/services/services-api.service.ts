import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, iif, map, of, switchMap, tap } from 'rxjs';
import { Service } from '../interfaces/service.interface';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ServicesApiService {
  private loaded = false;
  private services = new BehaviorSubject<Service[]>([]);

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  public getServices() {
    return iif(() => this.loaded, this.services.asObservable(), this.refreshServices());
  }

  private refreshServices() {
    return this.http.get<Service[]>(`${environment.apiUrl}/services`).pipe(
      switchMap(services => {
        this.loaded = true;
        this.services.next(services);
        return this.services.asObservable();
      }),
    );
  }

  public getService(id: string) {
    return this.http.get<Service>(`${environment.apiUrl}/services/${id}`);
  }

  public createService(service: Service) {
    return this.http.post<Service>(`${environment.apiUrl}/services`, service).pipe(
      tap(() => {
        this.createSuccessToast('Service created successfully');
        this.invalidateCache();
      }),
    );
  }

  public updateService(id: string, service: Service) {
    return this.http.put<Service>(`${environment.apiUrl}/services/${id}`, service).pipe(
      tap(() => {
        this.createSuccessToast('Service updated successfully');
        this.invalidateCache();
      }),
    );
  }

  public deleteService(id: string) {
    return this.http.delete<void>(`${environment.apiUrl}/services/${id}`).pipe(
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
      this.services.next([]);
    }
  }
}
