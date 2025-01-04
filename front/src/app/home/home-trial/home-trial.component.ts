import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-trial',
  imports: [Button, TranslateModule, RouterLink],
  templateUrl: './home-trial.component.html',
  styleUrl: './home-trial.component.scss',
})
export class HomeTrialComponent {}
