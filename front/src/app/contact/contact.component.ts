import { Component } from '@angular/core';
import { ContactBannerComponent } from './contact-banner/contact-banner.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { HomeTrialComponent } from '../home/home-trial/home-trial.component';
import { HomeSocialShowcaseComponent } from '../home/home-social-showcase/home-social-showcase.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactBannerComponent, ContactFormComponent, HomeTrialComponent, HomeSocialShowcaseComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {}
