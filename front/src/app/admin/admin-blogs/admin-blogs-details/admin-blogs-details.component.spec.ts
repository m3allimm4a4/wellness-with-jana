import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBlogsDetailsComponent } from './admin-blogs-details.component';

describe('AdminBlogsDetailsComponent', () => {
  let component: AdminBlogsDetailsComponent;
  let fixture: ComponentFixture<AdminBlogsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBlogsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBlogsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
