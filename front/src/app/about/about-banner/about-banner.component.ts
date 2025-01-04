import { Component, computed, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Asset, AssetType } from '../../shared/interfaces/asset.interface';
import { AssetsService } from '../../shared/services/assets.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-about-banner',
  imports: [TranslateModule, NgStyle],
  templateUrl: './about-banner.component.html',
  styleUrl: './about-banner.component.scss',
})
export class AboutBannerComponent implements OnInit {
  asset = signal<Asset | undefined>(undefined);
  isImage = computed(() => this.asset() && this.asset()?.type === AssetType.IMAGE);
  isVideo = computed(() => this.asset() && this.asset()?.type === AssetType.VIDEO);

  constructor(private assetsService: AssetsService) {}

  ngOnInit() {
    this.assetsService.getAssetById('about-banner-background').subscribe(asset => {
      this.asset.set(asset);
    });
  }
}
