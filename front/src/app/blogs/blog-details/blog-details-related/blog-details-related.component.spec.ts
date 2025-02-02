import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailsRelatedComponent } from './blog-details-related.component';

describe('BlogDetailsRelatedComponent', () => {
  let component: BlogDetailsRelatedComponent;
  let fixture: ComponentFixture<BlogDetailsRelatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDetailsRelatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogDetailsRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
