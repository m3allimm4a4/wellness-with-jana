import { inject, Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../components/login/login.component';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, tap } from 'rxjs';
import { EmailVerificationComponent } from '../components/email-verification/email-verification.component';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly dialogService = inject(DialogService);
  private readonly messageService = inject(MessageService);

  private readonly user = new BehaviorSubject<User | undefined>(undefined);

  private loginDialog: DynamicDialogRef | undefined;
  private signUpDialog: DynamicDialogRef | undefined;
  private emailVerificationDialog: DynamicDialogRef | undefined;

  public getUser() {
    return this.user.asObservable();
  }

  public openLoginDialog() {
    this.closeDialogs();
    this.loginDialog = this.dialogService.open(LoginComponent, {
      header: 'Login',
      modal: true,
      closable: true,
      appendTo: 'body',
    });
  }

  public openSignUpDialog() {
    this.closeDialogs();
    this.signUpDialog = this.dialogService.open(SignUpComponent, {
      header: 'Sign Up',
      modal: true,
      closable: true,
      appendTo: 'body',
      width: '80%',
      contentStyle: { overflow: 'unset' },
    });
  }

  public openEmailVerificationDialog(emailVerification: string) {
    this.closeDialogs();
    this.loginDialog = this.dialogService.open(EmailVerificationComponent, {
      header: 'Email Verification',
      modal: true,
      closable: true,
      appendTo: 'body',
      data: { emailVerification },
    });
  }

  public login(username: string, password: string) {
    if (username !== 'admin' || password !== 'admin') {
      this.messageService.add({
        key: 'toast',
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid username or password',
      });
      return;
    }
    this.closeDialogs();
    this.router.navigate(['/admin', 'home']).then();
    this.messageService.add({
      key: 'toast',
      severity: 'success',
      summary: 'Success',
      detail: `Hello ${username}!`,
    });
  }

  public logout() {
    this.user.next(undefined);
  }

  public signUp(user: User) {
    return this.http.post<void>(`${environment.apiUrl}/auth/sign-up`, user).pipe(
      tap(() => {
        this.closeDialogs();
        this.messageService.add({
          key: 'toast',
          severity: 'warn',
          summary: 'Email Verification',
          detail: `An email verification has been sent to ${user.email}`,
          sticky: true,
        });
      }),
    );
  }

  public verifyEmail(emailVerification: string) {
    return this.http.patch<void>(`${environment.apiUrl}/auth/verify-email`, { hash: emailVerification });
  }

  private closeDialogs() {
    this.loginDialog?.close();
    this.loginDialog = undefined;
    this.signUpDialog?.close();
    this.signUpDialog = undefined;
    this.emailVerificationDialog?.close();
    this.emailVerificationDialog = undefined;
  }
}
