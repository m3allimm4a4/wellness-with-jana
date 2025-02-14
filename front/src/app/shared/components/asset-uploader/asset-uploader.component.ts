import { Component, inject, input, OnDestroy, signal } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { Button } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { Fieldset } from 'primeng/fieldset';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-asset-uploader',
  imports: [ImageCropperComponent, Button, Fieldset],
  templateUrl: './asset-uploader.component.html',
  styleUrl: './asset-uploader.component.scss',
})
export class AssetUploaderComponent implements OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly messageService = inject(MessageService);

  uploadUrl = input.required<string>();
  aspectRatio = input<number>();

  protected isUploadLoading = signal<boolean>(false);
  protected readonly imageChangedEvent = signal<Event | undefined>(undefined);
  protected readonly croppedImage = signal<Blob | null | undefined>(undefined);
  protected readonly selectedVideo = signal<File | undefined>(undefined);
  protected readonly selectedVideoUrl = signal<string>('');

  ngOnDestroy() {
    if (this.selectedVideoUrl()) {
      URL.revokeObjectURL(this.selectedVideoUrl());
    }
  }

  onImageFileChange(event: Event): void {
    this.imageChangedEvent.set(event);
    this.resetVideo();
  }

  onVideoFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (!target.files?.length) {
      return;
    }
    this.selectedVideo.set(target.files[0]);
    if (this.selectedVideoUrl()) {
      URL.revokeObjectURL(this.selectedVideoUrl());
    }
    this.selectedVideoUrl.set(URL.createObjectURL(target.files[0]));
    target.value = '';
    this.resetImage();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage.set(event.blob);
  }

  uploadCroppedImage() {
    const image = this.croppedImage();
    const video = this.selectedVideo();
    if (!image && !video) {
      return;
    }
    const formData = new FormData();
    if (image) {
      formData.append('file', image);
    } else if (video) {
      formData.append('file', video);
    }
    this.isUploadLoading.set(true);
    this.http
      .post<void>(this.uploadUrl(), formData)
      .pipe(finalize(() => this.isUploadLoading.set(false)))
      .subscribe(() => {
        this.resetImage();
        this.resetVideo();
        this.messageService.add({
          key: 'toast',
          severity: 'success',
          summary: 'Success',
          detail: 'Upload Success',
        });
      });
  }

  loadImageFailed() {
    this.messageService.add({
      key: 'toast',
      severity: 'error',
      summary: 'Error',
      detail: 'Invalid image file',
    });
  }

  private resetImage() {
    this.croppedImage.set(undefined);
    this.imageChangedEvent.update(imageEvent => {
      if (imageEvent) {
        const t = imageEvent.target as HTMLInputElement;
        t.value = '';
      }
      return undefined;
    });
  }

  private resetVideo() {
    this.selectedVideo.set(undefined);
    this.selectedVideoUrl.update(url => {
      if (url) {
        URL.revokeObjectURL(url);
      }
      return '';
    });
  }
}
