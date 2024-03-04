import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFavoriteAddressComponent } from './all-favorite-address.component';

describe('AllFavoriteAddressComponent', () => {
  let component: AllFavoriteAddressComponent;
  let fixture: ComponentFixture<AllFavoriteAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFavoriteAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFavoriteAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
