import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { IgPost } from '../../shared/interfaces/ig-post.interface';
import { IgPostsApiService } from '../../shared/services/ig-posts-api.service';
import { Subscription } from 'rxjs';
import { AssetComponent } from '../../shared/components/asset/asset.component';

@Component({
  selector: 'app-home-social-showcase',
  standalone: true,
  imports: [AssetComponent],
  templateUrl: './home-social-showcase.component.html',
  styleUrl: './home-social-showcase.component.scss',
})
export class HomeSocialShowcaseComponent implements OnInit, OnDestroy {
  igPosts = signal<IgPost[]>([]);

  private subscription = new Subscription();

  constructor(private igPostsApiService: IgPostsApiService) {}

  ngOnInit() {
    this.subscription.add(this.igPostsApiService.getIgPosts().subscribe(igPosts => this.igPosts.set(igPosts)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
