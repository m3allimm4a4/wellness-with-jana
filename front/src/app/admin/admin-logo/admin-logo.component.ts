import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { AssetUploaderComponent } from '../../shared/components/asset-uploader/asset-uploader.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-logo',
  imports: [Card, AssetUploaderComponent],
  templateUrl: './admin-logo.component.html',
  styleUrl: './admin-logo.component.scss',
})
export class AdminLogoComponent {
  uploadUrl = `${environment.apiUrl}/assets/upload-favicon`;
}
