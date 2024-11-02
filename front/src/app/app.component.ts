import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { ToastModule, ToastPositionType } from 'primeng/toast';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastModule, ConfirmDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  toastPosition: ToastPositionType = 'top-right';

  constructor(translate: TranslateService, deviceService: DeviceDetectorService) {
    translate.addLangs(environment.languages);
    translate.setDefaultLang('en');
    translate.use(this.getUserLanguage());

    if (deviceService.isMobile()) {
      this.toastPosition = 'bottom-right';
    }
  }

  private getUserLanguage() {
    return navigator.languages.find(l => environment.languages.includes(l)) || 'en';
  }
}
