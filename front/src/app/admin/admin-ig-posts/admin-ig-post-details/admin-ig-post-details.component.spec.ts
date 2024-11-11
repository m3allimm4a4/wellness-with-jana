import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIgPostDetailsComponent } from './admin-ig-post-details.component';

describe('AdminIgPostDetailsComponent', () => {
  let component: AdminIgPostDetailsComponent;
  let fixture: ComponentFixture<AdminIgPostDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminIgPostDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminIgPostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
