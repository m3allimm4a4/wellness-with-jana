import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAboutDescriptionComponent } from './admin-about-description.component';

describe('AdminAboutDescriptionComponent', () => {
  let component: AdminAboutDescriptionComponent;
  let fixture: ComponentFixture<AdminAboutDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAboutDescriptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAboutDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
