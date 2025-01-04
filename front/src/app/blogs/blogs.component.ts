import { Component } from '@angular/core';
import { HomeTrialComponent } from '../home/home-trial/home-trial.component';
import { HomeSocialShowcaseComponent } from '../home/home-social-showcase/home-social-showcase.component';
import { BlogsListComponent } from './blogs-list/blogs-list.component';

@Component({
  selector: 'app-blogs',
  imports: [HomeTrialComponent, HomeSocialShowcaseComponent, BlogsListComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent {}
