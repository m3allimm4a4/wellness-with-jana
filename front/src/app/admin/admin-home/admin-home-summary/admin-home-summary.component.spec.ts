import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeSummaryComponent } from './admin-home-summary.component';

describe('AdminHomeSummaryComponent', () => {
  let component: AdminHomeSummaryComponent;
  let fixture: ComponentFixture<AdminHomeSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHomeSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHomeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
