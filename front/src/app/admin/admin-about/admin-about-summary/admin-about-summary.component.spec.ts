import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAboutSummaryComponent } from './admin-about-summary.component';

describe('AdminAboutSummaryComponent', () => {
  let component: AdminAboutSummaryComponent;
  let fixture: ComponentFixture<AdminAboutSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAboutSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAboutSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
