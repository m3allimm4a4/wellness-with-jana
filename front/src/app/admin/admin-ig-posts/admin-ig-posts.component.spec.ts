import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIgPostsComponent } from './admin-ig-posts.component';

describe('AdminIgPostsComponent', () => {
  let component: AdminIgPostsComponent;
  let fixture: ComponentFixture<AdminIgPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminIgPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminIgPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
