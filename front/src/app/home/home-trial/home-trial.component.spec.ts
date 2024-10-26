import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTrialComponent } from './home-trial.component';

describe('HomeTrialComponent', () => {
  let component: HomeTrialComponent;
  let fixture: ComponentFixture<HomeTrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTrialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
