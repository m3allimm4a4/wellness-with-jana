import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServicesSummaryComponent } from './admin-services-summary.component';

describe('AdminServicesSummaryComponent', () => {
  let component: AdminServicesSummaryComponent;
  let fixture: ComponentFixture<AdminServicesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminServicesSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminServicesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
