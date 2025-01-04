import { Component, computed, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { AssetsService } from '../../shared/services/assets.service';
import { Asset, AssetType } from '../../shared/interfaces/asset.interface';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-banner',
  imports: [Button, TranslateModule, NgStyle, RouterLink],
  templateUrl: './home-banner.component.html',
  styleUrl: './home-banner.component.scss',
})
export class HomeBannerComponent implements OnInit {
  asset = signal<Asset | undefined>(undefined);
  isImage = computed(() => this.asset() && this.asset()?.type === AssetType.IMAGE);
  isVideo = computed(() => this.asset() && this.asset()?.type === AssetType.VIDEO);

  constructor(private assetsService: AssetsService) {}

  ngOnInit() {
    this.assetsService.getAssetById('home-banner-background').subscribe(asset => {
      this.asset.set(asset);
    });
  }
}
