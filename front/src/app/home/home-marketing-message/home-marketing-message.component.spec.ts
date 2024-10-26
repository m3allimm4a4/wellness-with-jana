import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMarketingMessageComponent } from './home-marketing-message.component';

describe('HomeMarketingMessageComponent', () => {
  let component: HomeMarketingMessageComponent;
  let fixture: ComponentFixture<HomeMarketingMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMarketingMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMarketingMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
