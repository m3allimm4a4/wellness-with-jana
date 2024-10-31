import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeServicesListComponent } from './home-services-list.component';

describe('HomeServicesListComponent', () => {
  let component: HomeServicesListComponent;
  let fixture: ComponentFixture<HomeServicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeServicesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeServicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
