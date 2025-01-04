import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Testemonial } from '../../shared/interfaces/testemonial.interface';
import { TestemonialsApiService } from '../../shared/services/testemonials-api.service';

@Component({
  selector: 'app-admin-testemonials',
  imports: [TableModule, Button, RouterLink],
  templateUrl: './admin-testemonials.component.html',
  styleUrl: './admin-testemonials.component.scss',
})
export class AdminTestemonialsComponent implements OnInit, OnDestroy {
  testemonials = signal<Testemonial[]>([]);

  private subscription = new Subscription();

  constructor(
    private confirmationService: ConfirmationService,
    private testemonialsApiService: TestemonialsApiService,
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.testemonialsApiService.getTestemonials().subscribe(testemonials => {
        this.testemonials.set(testemonials);
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDeleteClick(id: string) {
    this.confirmationService.confirm({
      key: 'confirmDialog',
      message: 'Are you sure you want to delete this testemonial?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.subscription.add(this.testemonialsApiService.deleteTestemonial(id).subscribe());
      },
    });
  }
}
