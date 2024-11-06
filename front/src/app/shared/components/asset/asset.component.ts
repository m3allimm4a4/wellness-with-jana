import { Component, input } from '@angular/core';
import { Asset, AssetType } from '../../interfaces/asset.interface';

@Component({
  selector: 'app-asset',
  standalone: true,
  imports: [],
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.scss',
})
export class AssetComponent {
  protected readonly AssetType = AssetType;
  asset = input<Asset>();
}
