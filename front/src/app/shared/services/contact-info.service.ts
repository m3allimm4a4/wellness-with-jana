import { inject, Injectable } from '@angular/core';
import { ReplaySubject, take, tap } from 'rxjs';
import { ContactInfo } from '../interfaces/contact-info.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ContactMessage } from '../interfaces/contact-message.interface';

@Injectable({ providedIn: 'root' })
export class ContactInfoService {
  private readonly http = inject(HttpClient);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly contactInfo = new ReplaySubject<ContactInfo>(1);

  getContactInfo() {
    return this.contactInfo.pipe(take(1));
  }

  saveContactInfo(contactInfo: ContactInfo) {
    return this.http.post<ContactInfo>(`${environment.apiUrl}/contact-info`, contactInfo).pipe(
      tap(res => {
        this.contactInfo.next(res);
        this.createSuccessToast('Contact info saved successfully');
      }),
    );
  }

  sendMessage(message: ContactMessage) {
    return this.http.post<void>(`${environment.apiUrl}/contact-info/send-message`, message).pipe(
      tap(() => {
        this.confirmationService.confirm({
          key: 'confirmDialog',
          message: 'Message sent successfully, we will get back to you as soon as possble!',
          header: 'Confirmation',
          rejectVisible: false,
          acceptLabel: 'OK',
          acceptIcon: 'none',
        });
      }),
    );
  }

  public refreshContactInfo() {
    return this.http
      .get<ContactInfo>(`${environment.apiUrl}/contact-info`)
      .pipe(tap(res => this.contactInfo.next(res)));
  }

  private createSuccessToast(message: string): void {
    this.messageService.add({
      key: 'toast',
      severity: 'success',
      summary: message,
    });
  }
}
