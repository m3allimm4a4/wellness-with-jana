import { Component } from '@angular/core';
import {
  HomeClientTestemonialCardComponent
} from './home-client-testemonial-card/home-client-testemonial-card.component';

@Component({
  selector: 'app-home-client-testemonials',
  standalone: true,
  imports: [HomeClientTestemonialCardComponent],
  templateUrl: './home-client-testemonials.component.html',
  styleUrl: './home-client-testemonials.component.scss',
})
export class HomeClientTestemonialsComponent {}
