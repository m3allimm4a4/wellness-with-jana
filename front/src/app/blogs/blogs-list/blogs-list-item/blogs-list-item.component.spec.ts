import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsListItemComponent } from './blogs-list-item.component';

describe('BlogsListItemComponent', () => {
  let component: BlogsListItemComponent;
  let fixture: ComponentFixture<BlogsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
