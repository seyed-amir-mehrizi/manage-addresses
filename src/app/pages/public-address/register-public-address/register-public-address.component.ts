import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { PublicAddressService } from 'src/app/services/public-address.service';

@Component({
  selector: 'app-register-public-address',
  templateUrl: './register-public-address.component.html',
  styleUrls: ['./register-public-address.component.scss']
})
export class RegisterPublicAddressComponent implements OnInit {

  publicAddressForm: FormGroup | undefined;
  isPublicAddressFormSubmit = false;
  isLoadingBtn: boolean = false;
  addressId;
  constructor(
    private fb: FormBuilder,
    private publicServiceAddress: PublicAddressService,
    private toastr: ToastrService,
    private router: Router,

  ) {
    this.addressId = this.router.getCurrentNavigation()?.extras.state;

  }
  ngOnInit(): void {
    this.makePublicAddressForm();
    if (this.addressId) {
      this.getPublicAddressById();
    }
  }

  makePublicAddressForm() {
    this.publicAddressForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    })
  }

  get publicAddressFormSubmitted() {
    return this.publicAddressForm?.controls;
  }


  registerPublicAddressForm() {
    const command = {
      id: this.addressId ? this.addressId['id'] : null,
      name: this.publicAddressForm?.value.name,
      address: this.publicAddressForm?.value.address,
      latitude: this.publicAddressForm?.value.latitude,
      longitude: this.publicAddressForm?.value.longitude,
    }
    this.isLoadingBtn = true;
    if (this.publicAddressForm?.invalid) {
      this.isPublicAddressFormSubmit = true;
      this.isLoadingBtn = false;
      return;
    }
    if (!this.addressId) {
      delete command.id;
      this.publicServiceAddress.registerPublicAddress(command)
        .subscribe((res) => {
          if (res) {
            this.isLoadingBtn = false;
            this.publicAddressForm?.reset();
            this.toastr.success(`The ${command.name} Address is Added Successfully`);
          }

        })
    } else {
      this.publicServiceAddress.editPublicAddressById(command)
        .subscribe((res) => {
          if (res) {
            this.isLoadingBtn = false;
            this.toastr.success(`The ${command.name} Address is Edited Successfully`);
            this.router.navigate(['/public-address'])
          }
        })
    }

  }

  getPublicAddressById() {
    this.publicServiceAddress.getPublicAddressById(this.addressId.id)
      .subscribe({
        next: (res: any) => {
          this.setPublicAddressFromValue(res)
        },
        error: (err) => {

        }
      })
  }


  setPublicAddressFromValue(res: any) {
    this.publicAddressForm?.patchValue({
      name: res.name,
      address: res.address,
      latitude: res.latitude,
      longitude: res.longitude,
    })
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    const inputValue = event.target.value;
    if (
      (charCode >= 48 && charCode <= 57) ||
      (charCode === 46 && inputValue.indexOf('.') === -1)
    ) {
      return true;
    }

    return false;
  }

}


