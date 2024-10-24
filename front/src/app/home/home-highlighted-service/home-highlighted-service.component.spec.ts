import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHighlightedServiceComponent } from './home-highlighted-service.component';

describe('HomeHighlightedServiceComponent', () => {
  let component: HomeHighlightedServiceComponent;
  let fixture: ComponentFixture<HomeHighlightedServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeHighlightedServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeHighlightedServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
