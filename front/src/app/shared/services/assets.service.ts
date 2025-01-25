import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, ReplaySubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Asset } from '../interfaces/asset.interface';

@Injectable({ providedIn: 'root' })
export class AssetsService {
  private readonly http = inject(HttpClient);
  private readonly assets = new ReplaySubject<Map<string, Asset>>(1);

  public getAssetById(id: string) {
    return this.assets.pipe(map(assets => assets.get(id)));
  }

  public refreshAssets() {
    return this.http.get<Asset[]>(`${environment.apiUrl}/assets`).pipe(
      map(assets => this.convertLabelsListToMap(assets)),
      tap(assets => this.assets.next(assets)),
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
