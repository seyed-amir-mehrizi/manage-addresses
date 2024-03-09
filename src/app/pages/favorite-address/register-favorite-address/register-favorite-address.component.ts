import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, map } from 'rxjs';
import { FavoriteAddressService } from 'src/app/services/favorite-address.service';
import { UserInfo } from 'src/app/shared/model/model';

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
  userInfo: UserInfo;
  isTextualAddress = false;
  address = '';
  latitude;
  longitude;
  addressId;

  constructor(
    private fb: FormBuilder,
    private favoriteAddressService: FavoriteAddressService,
    private toastr: ToastrService,
    private router: Router,

  ) {
    this.addressId = this.router.getCurrentNavigation()?.extras.state;
  }
  ngOnInit(): void {
    this.initForm();
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo !== null) {
      this.userInfo = JSON.parse(userInfo);
    }
    if (this.addressId) {
      this.getFavoriteAddressById();
    }
  }

  initForm() {
    this.favoriteAddressForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
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
    const command = {
      id: this.addressId ? this.addressId['id'] : null,
      userId: this.userInfo.id,
      name: this.favoriteAddressForm?.value.name,
      address: this.favoriteAddressForm?.value.address,
      latitude: this.latitude,
      longitude: this.longitude
    }
    if (!this.addressId) {
      delete command.id;
      this.favoriteAddressService.registerFavoriteAddress(command)
        .pipe(finalize(() => this.isLoadingBtn = false))
        .subscribe((res: any) => {
          this.toastr.success(`The ${command.name} Address is Added Successfully`);
          this.favoriteAddressForm?.reset();
        })
    }else{
      this.favoriteAddressService.editFavoriteAddressById(command)
      .subscribe((res) => {
        if (res) {
          this.isLoadingBtn = false;
          this.toastr.success(`The ${command.name} Address is Edited Successfully`);
          this.router.navigate(['/favorite-address'])
        }
      })
    }
  }

  getFavoriteAddressById() {
    this.favoriteAddressService.getFavoriteAddressById(this.addressId.id)
      .subscribe({
        next: (res: any) => {
          this.setFavoriteAddressFromValue(res)
        },
        error: (err) => {

        }
      })
  }
  setFavoriteAddressFromValue(res: any) {
    this.favoriteAddressForm?.patchValue({
      name: res.name,
      address: res.address,
      latitude: this.latitude,
      longitude: this.longitude,
    })
  }

  blurAddressInput(e) {
    this.favoriteAddressService.getAddressDetailsByText(e.target.value)
      .subscribe((res: any) => {
        if (res && res.length > 0) {
          this.longitude = res[0].lon;
          this.latitude = res[0].lat;
        } else {
          this.toastr.error(`The ${e.target.value} Address is not Valid!`);
          this.favoriteAddressForm?.reset();

        }
      })
  }

}
