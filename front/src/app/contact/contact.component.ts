import { Component } from '@angular/core';
import { ContactBannerComponent } from './contact-banner/contact-banner.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactBannerComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {}
