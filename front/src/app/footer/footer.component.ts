import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ContactInfoService } from '../shared/services/contact-info.service';
import { ContactInfo } from '../shared/interfaces/contact-info.interface';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  contactInfo = signal<ContactInfo | undefined>(undefined);

  constructor(
    private authService: AuthService,
    private contactInfoService: ContactInfoService,
  ) {}

  ngOnInit() {
    this.contactInfoService.getContactInfo().subscribe(contactInfo => this.contactInfo.set(contactInfo));
  }

  showLogin() {
    this.authService.openLoginDialog();
  }
}
