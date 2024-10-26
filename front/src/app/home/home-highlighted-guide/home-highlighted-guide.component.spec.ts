import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHighlightedGuideComponent } from './home-highlighted-guide.component';

describe('HomeHighlightedGuideComponent', () => {
  let component: HomeHighlightedGuideComponent;
  let fixture: ComponentFixture<HomeHighlightedGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeHighlightedGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeHighlightedGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
