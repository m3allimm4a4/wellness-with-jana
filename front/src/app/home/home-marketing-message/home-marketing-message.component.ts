import { Component, computed, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Asset, AssetType } from '../../shared/interfaces/asset.interface';
import { AssetsService } from '../../shared/services/assets.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-home-marketing-message',
  standalone: true,
  imports: [TranslateModule, NgStyle],
  templateUrl: './home-marketing-message.component.html',
  styleUrl: './home-marketing-message.component.scss',
})
export class HomeMarketingMessageComponent implements OnInit {
  asset = signal<Asset | undefined>(undefined);
  isImage = computed(() => this.asset() && this.asset()?.type === AssetType.IMAGE);
  isVideo = computed(() => this.asset() && this.asset()?.type === AssetType.VIDEO);

  constructor(private assetsService: AssetsService) {}

  ngOnInit() {
    this.assetsService.getAssetById('home-marketing-background').subscribe(asset => {
      this.asset.set(asset);
    });
  }
}
