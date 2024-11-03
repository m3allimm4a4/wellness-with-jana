import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-marketing-message',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './home-marketing-message.component.html',
  styleUrl: './home-marketing-message.component.scss',
})
export class HomeMarketingMessageComponent {}
