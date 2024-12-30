import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';

@Injectable()
export class DynamicConfigService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  getConfigByName(name: string) {
    return this.http.get<Record<string, any>>(`${environment.apiUrl}/dynamic-config/${name}`);
  }

  saveConfig(name: string, config: Record<string, any>) {
    return this.http
      .post(`${environment.apiUrl}/dynamic-config/${name}`, config)
      .pipe(tap(() => this.createSuccessToast('Settings updated successfully')));
  }

  private createSuccessToast(message: string): void {
    this.messageService.add({
      key: 'toast',
      severity: 'success',
      summary: message,
    });
  }
}
