import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-trial',
  standalone: true,
  imports: [Button, TranslateModule],
  templateUrl: './home-trial.component.html',
  styleUrl: './home-trial.component.scss',
})
export class HomeTrialComponent {}
