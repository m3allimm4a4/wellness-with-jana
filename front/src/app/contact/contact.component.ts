import { Component } from '@angular/core';
import { ContactBannerComponent } from './contact-banner/contact-banner.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactBannerComponent, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {}
