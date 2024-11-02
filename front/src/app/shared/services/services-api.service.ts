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

  public refreshServices() {
    return this.http.get<Service[]>(`${environment.apiUrl}/services`).pipe(
      switchMap(services => {
        this.loaded = true;
        this.services.next(services);
        return this.services.asObservable();
      }),
    );
  }

  public deleteService(id: string) {
    return this.http.delete<void>(`${environment.apiUrl}/services/${id}`).pipe(
      switchMap(() => this.refreshServices()),
      tap(() => {
        this.messageService.add({
          key: 'toast',
          severity: 'success',
          summary: 'Service deleted successfully !',
        });
      }),
      map(() => of(null)),
    );
  }
}
