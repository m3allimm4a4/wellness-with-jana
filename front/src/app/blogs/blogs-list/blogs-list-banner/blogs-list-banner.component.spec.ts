import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsListBannerComponent } from './blogs-list-banner.component';

describe('BlogsListBannerComponent', () => {
  let component: BlogsListBannerComponent;
  let fixture: ComponentFixture<BlogsListBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsListBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogsListBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
