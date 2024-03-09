import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { FavoriteAddressService } from 'src/app/services/favorite-address.service';

@Component({
  selector: 'app-register-favorite-address',
  templateUrl: './register-favorite-address.component.html',
  styleUrls: ['./register-favorite-address.component.scss']
})
export class RegisterFavoriteAddressComponent implements OnInit {
  favoriteAddressForm: FormGroup | undefined;
  isFavoriteFormSubmitted = false;
  isLoadingBtn = false;
  addressType: number;
  isTextualAddress = false;
  address = '';
  latitude;
  longitude;


  constructor(
    private fb: FormBuilder,
    private favoriteAddressService: FavoriteAddressService
  ) {

  }
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.favoriteAddressForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      address: this.addressType === 1 ? [this.address, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]] : [],
      latitude: [this.addressType === 1 ? this.latitude : '', Validators.required],
      longitude: [this.addressType === 1 ? this.longitude : '', Validators.required],
    })
  }

  get favoriteAddressFormSubmitted() {
    return this.favoriteAddressForm?.controls;
  }

  registerFavoriteAddressForm() {
    this.isLoadingBtn = true;
    if (this.favoriteAddressForm?.invalid) {
      this.isFavoriteFormSubmitted = true;
      this.isLoadingBtn = false;
      return;
    }
  }

  selectAddressType(e) {
    this.addressType = parseInt(e.target.value);
    this.isTextualAddress = this.addressType === 1 ? true : false;
    this.initForm();
  }

  leaveAddressInput(e) {
    this.favoriteAddressService.getAddressDetailsByText(e.target.value)
      // .pipe(map((data: any) => {
      //   return {
      //     longitude: data[0].lon,
      //     latitude: data[0].lat
      //   }
      // }))
      .subscribe((res: any) => {
        console.log("res : ", res);
        // this.longitude = res.longitude;
        // this.latitude = res.latitude;
        

      })
  }

}
