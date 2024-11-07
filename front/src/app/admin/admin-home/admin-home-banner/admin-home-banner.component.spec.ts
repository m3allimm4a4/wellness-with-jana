import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeBannerComponent } from './admin-home-banner.component';

describe('AdminHomeBannerComponent', () => {
  let component: AdminHomeBannerComponent;
  let fixture: ComponentFixture<AdminHomeBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHomeBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminHomeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
