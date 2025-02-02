import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Asset, AssetType } from '../../../shared/interfaces/asset.interface';
import { NgStyle } from '@angular/common';
import { AssetsService } from '../../../shared/services/assets.service';

@Component({
  selector: 'app-blog-details-banner',
  imports: [NgStyle],
  templateUrl: './blog-details-banner.component.html',
  styleUrl: './blog-details-banner.component.scss',
})
export class BlogDetailsBannerComponent {
  private readonly assetsService = inject(AssetsService);
  assetId = input<string>();
  asset = signal<Asset | undefined>(undefined);
  isImage = computed(() => this.asset() && this.asset()?.type === AssetType.IMAGE);
  isVideo = computed(() => this.asset() && this.asset()?.type === AssetType.VIDEO);

  constructor() {
    effect(() => {
      const assetId = this.assetId();
      if (assetId) {
        this.assetsService.getAssetById(assetId).subscribe(asset => this.asset.set(asset));
      }
    });
  }
}
