import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPublicAddressesComponent } from './all-public-addresses.component';

describe('AllPublicAddressesComponent', () => {
  let component: AllPublicAddressesComponent;
  let fixture: ComponentFixture<AllPublicAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPublicAddressesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPublicAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
