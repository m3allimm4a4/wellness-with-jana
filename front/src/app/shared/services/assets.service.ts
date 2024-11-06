import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, iif, map, take, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Asset } from '../interfaces/asset.interface';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AssetsService {
  private assets = new BehaviorSubject<Map<string, Asset>>(new Map());

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  public getAssets() {
    return iif(() => this.assets.value.size === 0, this.refreshAssets(), this.assets.asObservable().pipe(take(1)));
  }

  public getAssetById(id: string) {
    return this.getAssets().pipe(map(assets => assets.get(id)));
  }

  public refreshAssets() {
    return this.http.get<Asset[]>(`${environment.apiUrl}/assets`).pipe(
      map(assets => this.convertLabelsListToMap(assets)),
      tap(assets => this.assets.next(assets)),
    );
  }

  public createOrUpdateAsset(name: string, path: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);

    return this.http.post<Asset>(`${environment.apiUrl}/assets/${name}`, formData).pipe(
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

  private convertLabelsListToMap(assets: Asset[]) {
    const res = new Map<string, Asset>();
    assets.forEach(asset => {
      res.set(asset.name, { ...asset, path: `${environment.assetsUrl}/${asset.path}` });
    });
    return res;
  }
}
