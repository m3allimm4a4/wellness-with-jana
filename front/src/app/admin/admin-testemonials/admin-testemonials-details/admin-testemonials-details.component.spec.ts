import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTestemonialsDetailsComponent } from './admin-testemonials-details.component';

describe('AdminServicesDetailsComponent', () => {
  let component: AdminTestemonialsDetailsComponent;
  let fixture: ComponentFixture<AdminTestemonialsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTestemonialsDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTestemonialsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
