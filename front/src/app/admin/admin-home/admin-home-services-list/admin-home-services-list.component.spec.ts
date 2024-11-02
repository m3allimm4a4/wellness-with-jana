import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeServicesListComponent } from './admin-home-services-list.component';

describe('AdminHomeServicesListComponent', () => {
  let component: AdminHomeServicesListComponent;
  let fixture: ComponentFixture<AdminHomeServicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHomeServicesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHomeServicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
