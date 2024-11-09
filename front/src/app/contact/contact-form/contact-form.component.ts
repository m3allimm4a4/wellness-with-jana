import { Component, OnInit, signal } from '@angular/core';
import { ContactInfoService } from '../../shared/services/contact-info.service';
import { ContactInfo } from '../../shared/interfaces/contact-info.interface';
import { InputTextModule } from 'primeng/inputtext';
import { NgStyle } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [InputTextModule, NgStyle, InputTextareaModule, Button],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  contactInfo = signal<ContactInfo | undefined>(undefined);

  constructor(private contactInfoService: ContactInfoService) {}

  ngOnInit() {
    this.contactInfoService.getContactInfo().subscribe(contactInfo => this.contactInfo.set(contactInfo));
  }
}
