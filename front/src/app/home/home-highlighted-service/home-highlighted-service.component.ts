import { Component, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { LazyAnimateDirective } from '../../shared/directives/lazy-animate.directive';
import { TranslateModule } from '@ngx-translate/core';
import { Asset, AssetType } from '../../shared/interfaces/asset.interface';
import { AssetsService } from '../../shared/services/assets.service';

@Component({
  selector: 'app-home-highlighted-service',
  standalone: true,
  imports: [Button, LazyAnimateDirective, TranslateModule],
  templateUrl: './home-highlighted-service.component.html',
  styleUrl: './home-highlighted-service.component.scss',
})
export class HomeHighlightedServiceComponent implements OnInit {
  protected readonly AssetType = AssetType;
  protected asset = signal<Asset | undefined>(undefined);

  constructor(private assetsService: AssetsService) {}

  ngOnInit() {
    this.assetsService.getAssetById('home-highlighted-service').subscribe(asset => this.asset.set(asset));
  }
}
