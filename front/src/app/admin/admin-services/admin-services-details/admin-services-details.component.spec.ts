import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServicesDetailsComponent } from './admin-services-details.component';

describe('AdminServicesDetailsComponent', () => {
  let component: AdminServicesDetailsComponent;
  let fixture: ComponentFixture<AdminServicesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminServicesDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminServicesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
