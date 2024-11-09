import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, take, tap } from 'rxjs';
import { ContactInfo } from '../interfaces/contact-info.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ContactInfoService {
  private loaded = false;
  private contactInfo = new BehaviorSubject<ContactInfo>({});

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  getContactInfo() {
    return iif(() => this.loaded, this.contactInfo.pipe(take(1)), this.refreshContactInfo());
  }

  saveContactInfo(contactInfo: ContactInfo) {
    return this.http.post<ContactInfo>(`${environment.apiUrl}/contacts`, contactInfo).pipe(
      tap(res => {
        this.contactInfo.next(res);
        this.createSuccessToast('Contact info saved successfully');
      }),
    );
  }

  private refreshContactInfo() {
    return this.http.get<ContactInfo>(`${environment.apiUrl}/contacts`).pipe(
      tap(res => {
        this.loaded = true;
        this.contactInfo.next(res);
        // }));
        // this.contactInfo.next({
        //   phone: '96103123123',
        //   email: 'test@test.com',
        //   address: '102 Street, New York, USA',
        //   ig: 'https://instagram.com/',
        //   facebook: 'https://facebook.com/',
        //   youtube: 'https://youtube.com/',
        //   whatsapp: 'https://wa.me/96103123123',
        // });
      }),
    );
  }

  private createSuccessToast(message: string): void {
    this.messageService.add({
      key: 'toast',
      severity: 'success',
      summary: message,
    });
  }
}
