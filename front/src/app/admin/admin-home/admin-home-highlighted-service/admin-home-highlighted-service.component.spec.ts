import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeHighlightedServiceComponent } from './admin-home-highlighted-service.component';

describe('AdminHomeHighlightedServiceComponent', () => {
  let component: AdminHomeHighlightedServiceComponent;
  let fixture: ComponentFixture<AdminHomeHighlightedServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHomeHighlightedServiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminHomeHighlightedServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
