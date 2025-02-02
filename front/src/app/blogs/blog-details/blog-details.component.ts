import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogApiService } from '../../shared/services/blog-api.service';
import { of, switchMap, tap } from 'rxjs';
import { Blog } from '../../shared/interfaces/blog.interface';
import { HomeTrialComponent } from '../../home/home-trial/home-trial.component';
import { HomeSocialShowcaseComponent } from '../../home/home-social-showcase/home-social-showcase.component';
import { BlogDetailsBannerComponent } from './blog-details-banner/blog-details-banner.component';

@Component({
  selector: 'app-blog-details',
  imports: [HomeTrialComponent, HomeSocialShowcaseComponent, BlogDetailsBannerComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss',
})
export class BlogDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly blogApiService = inject(BlogApiService);

  protected readonly blog = signal<Blog | undefined>(undefined);

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('id');
          if (!id) {
            return of(undefined);
          }
          return this.blogApiService.getBlogById(id);
        }),
        tap(blog => this.blog.set(blog)),
      )
      .subscribe();
  }
}
