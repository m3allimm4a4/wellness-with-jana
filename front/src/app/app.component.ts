import { Component, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { ToastModule, ToastPositionType } from 'primeng/toast';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ScrollTopModule } from 'primeng/scrolltop';
import { AuthService } from './shared/services/auth.service';
import { AssetsService } from './shared/services/assets.service';
import { ContactInfoService } from './shared/services/contact-info.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastModule, ConfirmDialogModule, ScrollTopModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly renderer = inject(Renderer2);
  private readonly translate = inject(TranslateService);
  private readonly deviceService = inject(DeviceDetectorService);
  private readonly authService = inject(AuthService);
  private readonly assetsService = inject(AssetsService);
  private readonly contactInfoService = inject(ContactInfoService);

  toastPosition: ToastPositionType = this.deviceService.isMobile() ? 'bottom-right' : 'top-right';

  private subscription = new Subscription();

  ngOnInit() {
    this.setFavicons();
    this.translate.addLangs(environment.languages);
    this.translate.setDefaultLang('en');
    this.translate.use(this.getUserLanguage());
    this.subscription.add(this.authService.refresh(false).subscribe());
    this.subscription.add(this.assetsService.refreshAssets().subscribe());
    this.subscription.add(this.contactInfoService.refreshContactInfo().subscribe());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getUserLanguage() {
    return navigator.languages.find(l => environment.languages.includes(l)) || 'en';
  }

  private setFavicons() {
    const faviconBaseUrl = `${environment.assetsUrl}/favicon`;
    const links = [
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${faviconBaseUrl}/favicon-32x32.png` },
      { rel: 'icon', type: 'image/png', sizes: '48x48', href: `${faviconBaseUrl}/favicon-48x48.png` },
      { rel: 'apple-touch-icon', sizes: '180x180', href: `${faviconBaseUrl}/favicon-192x192.png` },
      { rel: 'manifest', href: `${faviconBaseUrl}/site.webmanifest` },
    ];

    links.forEach(linkInfo => {
      let linkElement: HTMLLinkElement = this.renderer.createElement('link');
      linkElement.rel = linkInfo.rel;
      linkElement.href = linkInfo.href;
      if (linkInfo.type) {
        linkElement.type = linkInfo.type;
      }
      if (linkInfo.sizes) {
        linkElement.setAttribute('sizes', linkInfo.sizes);
      }
      this.renderer.appendChild(document.head, linkElement);
    });
  }
}
