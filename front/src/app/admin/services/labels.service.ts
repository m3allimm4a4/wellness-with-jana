import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Label } from '../../shared/interfaces/label.interface';
import { BulkWriteResponse } from '../../shared/interfaces/bulk-write-response.interface';
import { BehaviorSubject, iif, map, take, tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class LabelsService {
  private labels = new BehaviorSubject<Map<string, string>>(new Map());

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  public getLabels() {
    return iif(() => this.labels.value.size === 0, this.refreshLabels(), this.labels.asObservable().pipe(take(1)));
  }

  public refreshLabels() {
    return this.http.get<Label[]>(`${environment.apiUrl}/labels`).pipe(
      map(labels => this.convertLabelsListToMap(labels)),
      tap(labels => this.labels.next(labels)),
    );
  }

  public createOrUpdateLabels(labels: Partial<Label>[]) {
    return this.http.post<BulkWriteResponse>(`${environment.apiUrl}/labels`, labels).pipe(
      tap(() =>
        this.messageService.add({
          key: 'toast',
          severity: 'success',
          summary: 'Success',
          detail: 'Saved Successfully !',
        }),
      ),
    );
  }

  private convertLabelsListToMap(labels: Label[]) {
    const res = new Map<string, string>();
    labels.forEach(label => {
      res.set(label.name, label.en);
    });
    return res;
  }
}
