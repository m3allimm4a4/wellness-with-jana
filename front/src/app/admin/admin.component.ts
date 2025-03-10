import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { LabelsService } from './services/labels.service';
import { finalize, Subscription } from 'rxjs';
import { MessagesModule } from 'primeng/messages';
import { DynamicConfigService } from './services/dynamic-config.service';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, AdminHeaderComponent, MessagesModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  providers: [LabelsService, DynamicConfigService],
})
export class AdminComponent implements OnInit, OnDestroy {
  doneLoading = signal<boolean>(false);

  private subscription = new Subscription();

  constructor(private labelsService: LabelsService) {}

  ngOnInit() {
    this.subscription.add(
      this.labelsService
        .refreshLabels()
        .pipe(finalize(() => this.doneLoading.set(true)))
        .subscribe(),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
