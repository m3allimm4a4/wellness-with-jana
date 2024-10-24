import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, Button],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
