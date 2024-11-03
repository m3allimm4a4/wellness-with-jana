import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { HomeClientTestemonialCardComponent } from './home-client-testemonial-card/home-client-testemonial-card.component';
import { Testemonial } from '../../shared/interfaces/testemonial.interface';
import { Subscription } from 'rxjs';
import { TestemonialsApiService } from '../../shared/services/testemonials-api.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home-client-testemonials',
  standalone: true,
  imports: [HomeClientTestemonialCardComponent, NgClass],
  templateUrl: './home-client-testemonials.component.html',
  styleUrl: './home-client-testemonials.component.scss',
})
export class HomeClientTestemonialsComponent implements OnInit, OnDestroy {
  testemonials = signal<Testemonial[]>([]);

  private subscription = new Subscription();

  constructor(private testemonialsApiService: TestemonialsApiService) {}

  ngOnInit() {
    this.subscription.add(
      this.testemonialsApiService.getTestemonials().subscribe(testemonials => {
        this.testemonials.set(testemonials.filter(t => t.tags.includes('home')).slice(0, 3));
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
