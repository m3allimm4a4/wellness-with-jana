import { Component, inject, OnInit, signal } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AuthService } from '../../services/auth.service';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  imports: [],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.scss',
})
export class EmailVerificationComponent implements OnInit {
  private readonly config = inject(DynamicDialogConfig);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly emailVerification = this.config?.data?.emailVerification;

  status = signal<'loading' | 'verified' | 'error'>('loading');

  ngOnInit() {
    this.authService
      .verifyEmail(this.emailVerification)
      .pipe(
        tap(() => this.status.set('verified')),
        catchError(err => {
          this.status.set('error');
          return throwError(() => err);
        }),
        finalize(() => this.router.navigate([])),
      )
      .subscribe();
  }

  openLogin() {
    this.authService.openLoginDialog();
  }
}
