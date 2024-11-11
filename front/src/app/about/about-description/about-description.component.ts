import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { LazyAnimateDirective } from '../../shared/directives/lazy-animate.directive';

@Component({
  selector: 'app-about-description',
  standalone: true,
  imports: [Button, LazyAnimateDirective],
  templateUrl: './about-description.component.html',
  styleUrl: './about-description.component.scss',
})
export class AboutDescriptionComponent {}
