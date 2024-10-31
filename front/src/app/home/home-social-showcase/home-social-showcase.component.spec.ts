import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSocialShowcaseComponent } from './home-social-showcase.component';

describe('HomeSocialShowcaseComponent', () => {
  let component: HomeSocialShowcaseComponent;
  let fixture: ComponentFixture<HomeSocialShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSocialShowcaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeSocialShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
