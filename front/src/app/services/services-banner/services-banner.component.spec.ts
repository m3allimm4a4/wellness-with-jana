import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesBannerComponent } from './services-banner.component';

describe('ServicesBannerComponent', () => {
  let component: ServicesBannerComponent;
  let fixture: ComponentFixture<ServicesBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
