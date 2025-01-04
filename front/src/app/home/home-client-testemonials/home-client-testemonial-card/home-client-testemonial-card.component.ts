import { Component, input } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-home-client-testemonial-card',
  imports: [DividerModule],
  templateUrl: './home-client-testemonial-card.component.html',
  styleUrl: './home-client-testemonial-card.component.scss',
})
export class HomeClientTestemonialCardComponent {
  comment = input<string>('');
  name = input<string>('');
  address = input<string>('');
}
