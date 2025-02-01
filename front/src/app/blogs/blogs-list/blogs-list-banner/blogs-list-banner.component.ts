import { Component, computed, OnInit, signal } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Asset, AssetType } from '../../../shared/interfaces/asset.interface';
import { AssetsService } from '../../../shared/services/assets.service';

@Component({
  selector: 'app-blogs-list-banner',
  imports: [NgStyle],
  templateUrl: './blogs-list-banner.component.html',
  styleUrl: './blogs-list-banner.component.scss',
})
export class BlogsListBannerComponent implements OnInit {
  asset = signal<Asset | undefined>(undefined);
  isImage = computed(() => this.asset() && this.asset()?.type === AssetType.IMAGE);
  isVideo = computed(() => this.asset() && this.asset()?.type === AssetType.VIDEO);

  constructor(private assetsService: AssetsService) {}

  ngOnInit() {
    this.assetsService.getAssetById('blogs-banner-background').subscribe(asset => {
      this.asset.set(asset);
    });
  }
}
