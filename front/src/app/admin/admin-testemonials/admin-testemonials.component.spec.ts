import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTestemonialsComponent } from './admin-testemonials.component';

describe('AdminServicesComponent', () => {
  let component: AdminTestemonialsComponent;
  let fixture: ComponentFixture<AdminTestemonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTestemonialsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTestemonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
