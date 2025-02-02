import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailsBannerComponent } from './blog-details-banner.component';

describe('BlogDetailsBannerComponent', () => {
  let component: BlogDetailsBannerComponent;
  let fixture: ComponentFixture<BlogDetailsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDetailsBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogDetailsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
