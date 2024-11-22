import { Component, computed, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgStyle } from '@angular/common';
import { Asset, AssetType } from '../../shared/interfaces/asset.interface';
import { AssetsService } from '../../shared/services/assets.service';

@Component({
  selector: 'app-services-banner',
  standalone: true,
  imports: [TranslateModule, NgStyle],
  templateUrl: './services-banner.component.html',
  styleUrl: './services-banner.component.scss',
})
export class ServicesBannerComponent implements OnInit {
  asset = signal<Asset | undefined>(undefined);
  isImage = computed(() => this.asset() && this.asset()?.type === AssetType.IMAGE);
  isVideo = computed(() => this.asset() && this.asset()?.type === AssetType.VIDEO);

  constructor(private assetsService: AssetsService) {}

  ngOnInit() {
    this.assetsService.getAssetById('services-banner-background').subscribe(asset => {
      this.asset.set(asset);
    });
  }
}
