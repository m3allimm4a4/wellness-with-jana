import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeHighlightedGuideComponent } from './admin-home-highlighted-guide.component';

describe('AdminHomeHighlightedGuideComponent', () => {
  let component: AdminHomeHighlightedGuideComponent;
  let fixture: ComponentFixture<AdminHomeHighlightedGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHomeHighlightedGuideComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminHomeHighlightedGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
