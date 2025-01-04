import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDescriptionComponent } from './about-description.component';

describe('AboutDescriptionComponent', () => {
  let component: AboutDescriptionComponent;
  let fixture: ComponentFixture<AboutDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutDescriptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
