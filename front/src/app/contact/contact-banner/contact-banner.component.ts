import { Component, computed, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { Asset, AssetType } from '../../shared/interfaces/asset.interface';
import { AssetsService } from '../../shared/services/assets.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-contact-banner',
  standalone: true,
  imports: [Button, TranslateModule, NgStyle],
  templateUrl: './contact-banner.component.html',
  styleUrl: './contact-banner.component.scss',
})
export class ContactBannerComponent implements OnInit {
  asset = signal<Asset | undefined>(undefined);
  isImage = computed(() => this.asset() && this.asset()?.type === AssetType.IMAGE);
  isVideo = computed(() => this.asset() && this.asset()?.type === AssetType.VIDEO);

  constructor(private assetsService: AssetsService) {}

  ngOnInit() {
    this.assetsService.getAssetById('contact-banner-background').subscribe(asset => {
      this.asset.set(asset);
    });
  }
}
