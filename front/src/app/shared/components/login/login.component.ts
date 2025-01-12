import { Component, inject } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { Password } from 'primeng/password';

@Component({
  selector: 'app-login',
  imports: [DialogModule, InputTextModule, ReactiveFormsModule, Button, Password],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe();
  }

  openSignUp() {
    this.authService.openSignUpDialog();
  }
}
