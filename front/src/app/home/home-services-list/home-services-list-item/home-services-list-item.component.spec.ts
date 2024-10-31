import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeServicesListItemComponent } from './home-services-list-item.component';

describe('HomeServicesListItemComponent', () => {
  let component: HomeServicesListItemComponent;
  let fixture: ComponentFixture<HomeServicesListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeServicesListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeServicesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
