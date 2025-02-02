import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailsContentComponent } from './blog-details-content.component';

describe('BlogDetailsContentComponent', () => {
  let component: BlogDetailsContentComponent;
  let fixture: ComponentFixture<BlogDetailsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDetailsContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogDetailsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
