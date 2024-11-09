import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, take } from 'rxjs';
import { ContactInfo } from '../interfaces/contact-info.interface';

@Injectable({ providedIn: 'root' })
export class ContactInfoService {
  private loaded = false;
  private contactInfo = new BehaviorSubject<ContactInfo>({});

  constructor() {}

  getContactInfo() {
    return iif(() => this.loaded, this.contactInfo.pipe(take(1)), this.refreshContactInfo());
  }

  private refreshContactInfo() {
    this.contactInfo.next({
      phone: '96103123123',
      email: 'test@test.com',
      address: '102 Street, New York, USA',
      ig: 'https://instagram.com/',
      facebook: 'https://facebook.com/',
      youtube: 'https://youtube.com/',
      whatsapp: 'https://wa.me/96103123123',
    });
    this.loaded = true;
    return this.contactInfo.pipe(take(1));
  }
}
