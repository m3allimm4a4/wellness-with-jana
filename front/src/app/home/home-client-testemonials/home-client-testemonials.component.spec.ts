import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeClientTestemonialsComponent } from './home-client-testemonials.component';

describe('HomeClientTestemonialsComponent', () => {
  let component: HomeClientTestemonialsComponent;
  let fixture: ComponentFixture<HomeClientTestemonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeClientTestemonialsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeClientTestemonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
