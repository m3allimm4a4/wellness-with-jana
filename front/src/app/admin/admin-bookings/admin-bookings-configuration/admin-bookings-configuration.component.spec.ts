import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookingsConfigurationComponent } from './admin-bookings-configuration.component';

describe('AdminBookingsConfigurationComponent', () => {
  let component: AdminBookingsConfigurationComponent;
  let fixture: ComponentFixture<AdminBookingsConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBookingsConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBookingsConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
