import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getCountryOptions } from '../../constants/countries';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [FloatLabel, ReactiveFormsModule, InputText, Select, Password, Button],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  private readonly authService = inject(AuthService);
  readonly countryOptions = getCountryOptions();

  signUpForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    lastname: new FormControl<string | null>(null, [Validators.required]),
    country: new FormControl<string | null>(null, [Validators.required]),
    phone: new FormControl<string | null>(null, [Validators.required]),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    password: new FormControl<string | null>(null, [Validators.required]),
  });

  openLogin() {
    this.authService.openLoginDialog();
  }

  onSignUp() {
    this.authService
      .signUp({
        name: this.signUpForm.controls.name.value || '',
        lastname: this.signUpForm.controls.lastname.value || '',
        phone: this.signUpForm.controls.phone.value || '',
        email: this.signUpForm.controls.email.value || '',
        password: this.signUpForm.controls.password.value || '',
        country: this.signUpForm.controls.country.value || '',
        emailVerified: false,
        roles: [],
      })
      .subscribe();
  }
}
