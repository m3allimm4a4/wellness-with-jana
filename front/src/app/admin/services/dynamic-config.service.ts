import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class DynamicConfigService {
  constructor(private http: HttpClient) {}

  getConfigByName(name: string) {
    return this.http.get<Record<string, any>>(`${environment.apiUrl}/dynamic-config/${name}`);
  }
}
