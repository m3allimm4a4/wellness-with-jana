import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBannerComponent } from './about-banner.component';

describe('AboutBannerComponent', () => {
  let component: AboutBannerComponent;
  let fixture: ComponentFixture<AboutBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
