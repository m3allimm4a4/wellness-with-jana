import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { ContactInfo } from '../../shared/interfaces/contact-info.interface';
import { ContactInfoService } from '../../shared/services/contact-info.service';
import { FileUploadModule } from 'primeng/fileupload';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-contact',
  standalone: true,
  imports: [CardModule, ReactiveFormsModule, InputTextModule, Button, FileUploadModule],
  templateUrl: './admin-contact.component.html',
  styleUrl: './admin-contact.component.scss',
})
export class AdminContactComponent implements OnInit {
  contactForm = new FormGroup({
    phone: new FormControl<string>('', { nonNullable: true }),
    whatsapp: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.email] }),
    address: new FormControl<string>('', { nonNullable: true }),
    ig: new FormControl<string>('', { nonNullable: true }),
    facebook: new FormControl<string>('', { nonNullable: true }),
    youtube: new FormControl<string>('', { nonNullable: true }),
  });

  url = `${environment.apiUrl}/assets/home/contact-banner-background`;

  constructor(private contactInfoService: ContactInfoService) {}

  ngOnInit() {
    this.contactInfoService.getContactInfo().subscribe(res => {
      this.contactForm.patchValue({ ...res });
    });
  }

  onContactSave() {
    if (!this.contactForm.valid) {
      return;
    }
    const newContactInfo: ContactInfo = {
      phone: this.contactForm.controls.phone.value,
      whatsapp: this.contactForm.controls.whatsapp.value,
      email: this.contactForm.controls.email.value,
      address: this.contactForm.controls.address.value,
      ig: this.contactForm.controls.ig.value,
      facebook: this.contactForm.controls.facebook.value,
      youtube: this.contactForm.controls.youtube.value,
    };
    this.contactInfoService.saveContactInfo(newContactInfo).subscribe(res => {
      this.contactForm.patchValue({ ...res });
    });
  }
}
