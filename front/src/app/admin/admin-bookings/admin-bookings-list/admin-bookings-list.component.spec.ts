import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookingsListComponent } from './admin-bookings-list.component';

describe('AdminBookingsListComponent', () => {
  let component: AdminBookingsListComponent;
  let fixture: ComponentFixture<AdminBookingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBookingsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBookingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
