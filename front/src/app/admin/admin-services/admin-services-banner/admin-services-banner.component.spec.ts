import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServicesBannerComponent } from './admin-services-banner.component';

describe('AdminServicesBannerComponent', () => {
  let component: AdminServicesBannerComponent;
  let fixture: ComponentFixture<AdminServicesBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminServicesBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminServicesBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
