import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeTrialComponent } from './admin-home-trial.component';

describe('AdminHomeTrialComponent', () => {
  let component: AdminHomeTrialComponent;
  let fixture: ComponentFixture<AdminHomeTrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHomeTrialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHomeTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
