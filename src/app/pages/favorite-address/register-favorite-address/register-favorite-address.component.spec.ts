import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFavoriteAddressComponent } from './register-favorite-address.component';

describe('RegisterFavoriteAddressComponent', () => {
  let component: RegisterFavoriteAddressComponent;
  let fixture: ComponentFixture<RegisterFavoriteAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFavoriteAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFavoriteAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
