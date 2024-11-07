import { Component, effect, input, signal } from '@angular/core';
import { Asset, AssetType } from '../../interfaces/asset.interface';
import { AssetsService } from '../../services/assets.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-asset',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.scss',
})
export class AssetComponent {
  assetId = input.required<string>();
  style = input<Record<string, string>>();

  protected readonly AssetType = AssetType;
  protected asset = signal<Asset | undefined>(undefined);

  constructor(private assetsService: AssetsService) {
    effect(() => {
      this.assetsService.getAssetById(this.assetId()).subscribe(asset => this.asset.set(asset));
    });
  }
}
