import { Component, inject, signal } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  imports: [Password, Button, FloatLabel, FormsModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss',
})
export class PasswordResetComponent {
  private readonly config = inject(DynamicDialogConfig);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly verification = this.config?.data?.verification;

  protected password = signal<string>('');

  onPasswordReset() {
    this.authService
      .resetPassword(this.verification, this.password())
      .pipe(finalize(() => this.router.navigate([])))
      .subscribe();
  }
}
