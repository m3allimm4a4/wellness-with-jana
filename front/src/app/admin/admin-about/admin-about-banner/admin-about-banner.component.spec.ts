import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAboutBannerComponent } from './admin-about-banner.component';

describe('AboutBannerComponent', () => {
  let component: AdminAboutBannerComponent;
  let fixture: ComponentFixture<AdminAboutBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAboutBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAboutBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
