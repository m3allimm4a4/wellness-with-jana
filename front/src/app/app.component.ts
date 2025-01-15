import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
  private readonly translate = inject(TranslateService);
  private readonly deviceService = inject(DeviceDetectorService);
  private readonly authService = inject(AuthService);
  private readonly assetsService = inject(AssetsService);
  private readonly contactInfoService = inject(ContactInfoService);

  toastPosition: ToastPositionType = this.deviceService.isMobile() ? 'bottom-right' : 'top-right';

  private subscription = new Subscription();

  ngOnInit() {
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
}
