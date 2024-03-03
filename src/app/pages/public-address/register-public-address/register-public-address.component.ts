import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(
    private fb: FormBuilder,
    private publicServiceAddress: PublicAddressService,
  ) {

  }
  ngOnInit(): void {
    this.makePublicAddressForm();
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
    this.publicServiceAddress.registerPublicAddress(command)
      .subscribe((res) => {
        if (res)
          console.log("res : ", res);
        this.isLoadingBtn = false;

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


