import { Component } from '@angular/core';
import { ComingSoonComponent } from '../shared/components/coming-soon/coming-soon.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ComingSoonComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {}
