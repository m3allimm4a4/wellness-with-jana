import { inject, Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../components/login/login.component';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { User, UserRole } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, finalize, map, of, switchMap, tap, timer } from 'rxjs';
import { EmailVerificationComponent } from '../components/email-verification/email-verification.component';
import { LoginResponse } from '../interfaces/login-response.interface';
import { PasswordResetComponent } from '../components/password-reset/password-reset.component';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly dialogService = inject(DialogService);
  private readonly messageService = inject(MessageService);

  private readonly user = new BehaviorSubject<User | undefined>(undefined);
  private readonly accessToken = new BehaviorSubject<string>('');

  private loginDialog: DynamicDialogRef | undefined;
  private signUpDialog: DynamicDialogRef | undefined;
  private emailVerificationDialog: DynamicDialogRef | undefined;
  private passwordResetDialog: DynamicDialogRef | undefined;

  public getUser$() {
    return this.user.asObservable();
  }

  public isLoggedIn(): boolean {
    return !!this.accessToken.value && !!this.user.value;
  }

  public getAccessToken() {
    return this.accessToken.value;
  }

  public openLoginDialog(fromRequirement = false) {
    this.closeDialogs();
    this.loginDialog = this.dialogService.open(LoginComponent, {
      header: fromRequirement ? 'You need to login before procceding' : 'Login',
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
    this.emailVerificationDialog = this.dialogService.open(EmailVerificationComponent, {
      header: 'Email Verification',
      modal: true,
      closable: true,
      appendTo: 'body',
      data: { emailVerification },
    });
  }

  public openPasswordResetDialog(verification: string) {
    this.closeDialogs();
    this.passwordResetDialog = this.dialogService.open(PasswordResetComponent, {
      header: 'Password Reset',
      modal: true,
      closable: true,
      appendTo: 'body',
      data: { verification },
      contentStyle: { overflow: 'unset' },
    });
  }

  public login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(
        `${environment.apiUrl}/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      )
      .pipe(
        tap(res => {
          this.handleLoginResponse(res);
          this.closeDialogs();
          this.showToast('success', 'Success', `Hello ${res.user.name}!`);
        }),
        catchError(() => {
          this.handleLoginError();
          this.showToast('error', 'Error', 'Invalid username or password');
          return of(undefined);
        }),
        finalize(() => {
          if (this.user.value?.roles.includes(UserRole.ADMIN)) {
            this.router.navigate(['/admin', 'home']).then();
          }
        }),
        map(() => undefined),
      );
  }

  public refresh(showToast = true) {
    return this.http.get<LoginResponse>(`${environment.apiUrl}/auth/refresh`, { withCredentials: true }).pipe(
      tap(res => this.handleLoginResponse(res)),
      catchError(() => {
        this.handleLoginError();
        if (showToast) {
          this.showToast('error', 'Error', 'Session expired, please log in again');
        }
        return of(undefined);
      }),
    );
  }

  public logout() {
    return this.http.delete<void>(`${environment.apiUrl}/auth/logout`, { withCredentials: true }).pipe(
      tap(() => {
        this.router.navigateByUrl('/').then();
        this.handleLoginError();
      }),
    );
  }

  public signUp(user: User) {
    return this.http.post<void>(`${environment.apiUrl}/auth/sign-up`, user).pipe(
      tap(() => {
        this.closeDialogs();
        this.showToast('warn', 'Email Verification', `An email verification has been sent to ${user.email}`, true);
      }),
    );
  }

  public verifyEmail(emailVerification: string) {
    return this.http.patch<void>(`${environment.apiUrl}/auth/verify-email`, { hash: emailVerification });
  }

  public forgotPassword(email: string) {
    return this.http
      .post<void>(`${environment.apiUrl}/auth/forgot-password`, { email })
      .pipe(tap(() => this.showToast('success', 'Success', `Check your email for a password reset link`, true)));
  }

  public resetPassword(verification: string, password: string) {
    return this.http
      .post<void>(`${environment.apiUrl}/auth/password-reset`, {
        verificationHash: verification,
        newPassword: password,
      })
      .pipe(
        tap(() => {
          this.closeDialogs();
          this.showToast('success', 'Success', `Your password has been reset, you can now log in`);
        }),
      );
  }

  private handleLoginResponse(res: LoginResponse) {
    this.accessToken.next(res.accessToken);
    this.user.next(res.user);
    const expiresIn = new Date(res.expiresAt).getTime() - Date.now() - 1000;
    timer(expiresIn)
      .pipe(switchMap(() => this.refresh()))
      .subscribe();
  }

  private handleLoginError() {
    this.user.next(undefined);
    this.accessToken.next('');
  }

  private closeDialogs() {
    this.loginDialog?.close();
    this.loginDialog = undefined;
    this.signUpDialog?.close();
    this.signUpDialog = undefined;
    this.emailVerificationDialog?.close();
    this.emailVerificationDialog = undefined;
    this.passwordResetDialog?.close();
    this.passwordResetDialog = undefined;
  }

  private showToast(severity: string, summary: string, detail: string, sticky = false) {
    this.messageService.add({
      key: 'toast',
      severity: severity,
      summary: summary,
      detail: detail,
      sticky: sticky,
    });
  }
}
