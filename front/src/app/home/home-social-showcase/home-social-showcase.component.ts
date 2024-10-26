import { Component } from '@angular/core';

@Component({
  selector: 'app-home-social-showcase',
  standalone: true,
  imports: [],
  templateUrl: './home-social-showcase.component.html',
  styleUrl: './home-social-showcase.component.scss',
})
export class HomeSocialShowcaseComponent {
  protected images = [
    'ig-showcase/ig1.webp',
    'ig-showcase/ig2.webp',
    'ig-showcase/ig3.webp',
    'ig-showcase/ig4.webp',
    'ig-showcase/ig5.webp',
    'ig-showcase/ig6.webp',
    'ig-showcase/ig5.webp',
    'ig-showcase/ig8.webp',
    'ig-showcase/ig6.webp',
    'ig-showcase/ig1.webp',
    'ig-showcase/ig10.webp',
    'ig-showcase/ig4.webp',
  ];
}
