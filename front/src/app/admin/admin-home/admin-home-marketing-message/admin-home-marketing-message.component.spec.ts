import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeMarketingMessageComponent } from './admin-home-marketing-message.component';

describe('AdminHomeMarketingMessageComponent', () => {
  let component: AdminHomeMarketingMessageComponent;
  let fixture: ComponentFixture<AdminHomeMarketingMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHomeMarketingMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminHomeMarketingMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
