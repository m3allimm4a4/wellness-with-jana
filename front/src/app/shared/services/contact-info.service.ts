import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, take, tap } from 'rxjs';
import { ContactInfo } from '../interfaces/contact-info.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ContactMessage } from '../interfaces/contact-message.interface';

@Injectable({ providedIn: 'root' })
export class ContactInfoService {
  private loaded = false;
  private contactInfo = new BehaviorSubject<ContactInfo>({});

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  getContactInfo() {
    return iif(() => this.loaded, this.contactInfo.pipe(take(1)), this.refreshContactInfo());
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

  private refreshContactInfo() {
    return this.http.get<ContactInfo>(`${environment.apiUrl}/contact-info`).pipe(
      tap(res => {
        this.loaded = true;
        this.contactInfo.next(res);
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
