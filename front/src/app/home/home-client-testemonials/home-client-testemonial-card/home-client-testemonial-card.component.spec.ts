import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeClientTestemonialCardComponent } from './home-client-testemonial-card.component';

describe('HomeClientTestemonialCardComponent', () => {
  let component: HomeClientTestemonialCardComponent;
  let fixture: ComponentFixture<HomeClientTestemonialCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeClientTestemonialCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeClientTestemonialCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
