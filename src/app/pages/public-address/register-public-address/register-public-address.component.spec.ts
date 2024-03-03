import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPublicAddressComponent } from './register-public-address.component';

describe('RegisterPublicAddressComponent', () => {
  let component: RegisterPublicAddressComponent;
  let fixture: ComponentFixture<RegisterPublicAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPublicAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPublicAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
