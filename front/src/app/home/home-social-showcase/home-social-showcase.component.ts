import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { IgPost } from '../../shared/interfaces/ig-post.interface';
import { IgPostsApiService } from '../../shared/services/ig-posts-api.service';
import { Subscription } from 'rxjs';
import { AssetComponent } from '../../shared/components/asset/asset.component';
import { ContactInfoService } from '../../shared/services/contact-info.service';

@Component({
  selector: 'app-home-social-showcase',
  imports: [AssetComponent],
  templateUrl: './home-social-showcase.component.html',
  styleUrl: './home-social-showcase.component.scss',
})
export class HomeSocialShowcaseComponent implements OnInit, OnDestroy {
  igPosts = signal<IgPost[]>([]);
  igLink = signal<string>('');

  private subscription = new Subscription();

  constructor(
    private igPostsApiService: IgPostsApiService,
    private contactInfoService: ContactInfoService,
  ) {}

  ngOnInit() {
    this.subscription.add(this.igPostsApiService.getIgPosts().subscribe(igPosts => this.igPosts.set(igPosts)));
    this.subscription.add(
      this.contactInfoService.getContactInfo().subscribe(contactInfo => {
        if (contactInfo?.ig) {
          this.igLink.set(contactInfo?.ig);
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
