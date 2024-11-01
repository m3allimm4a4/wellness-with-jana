import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.addLangs(environment.languages);
    translate.setDefaultLang('en');
    translate.use(this.getUserLanguage());
  }

  private getUserLanguage() {
    return navigator.languages.find(l => environment.languages.includes(l)) || 'en';
  }
}
