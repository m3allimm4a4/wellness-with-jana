import { Component, OnInit, signal } from '@angular/core';
import { ContactInfoService } from '../../shared/services/contact-info.service';
import { ContactInfo } from '../../shared/interfaces/contact-info.interface';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactMessage } from '../../shared/interfaces/contact-message.interface';
import { Textarea } from 'primeng/textarea';

@Component({
  selector: 'app-contact-form',
  imports: [InputTextModule, Button, ReactiveFormsModule, Textarea],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  contactInfo = signal<ContactInfo | undefined>(undefined);

  contactForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    phone: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    subject: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    message: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(private contactInfoService: ContactInfoService) {}

  ngOnInit() {
    this.contactInfoService.getContactInfo().subscribe(contactInfo => this.contactInfo.set(contactInfo));
  }

  onSendMessage() {
    if (!this.contactForm.valid) {
    }
    const message: ContactMessage = {
      name: this.contactForm.controls.name.value,
      email: this.contactForm.controls.email.value,
      phone: this.contactForm.controls.phone.value,
      subject: this.contactForm.controls.subject.value,
      message: this.contactForm.controls.message.value,
    };
    this.contactInfoService.sendMessage(message).subscribe(() => {
      this.contactForm.reset();
    });
  }
}
