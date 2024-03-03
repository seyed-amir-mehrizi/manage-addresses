import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { PublicAddressService } from 'src/app/services/public-address.service';
import { PublicAddress } from 'src/app/shared/model/model';

@Component({
  selector: 'app-all-public-addresses',
  templateUrl: './all-public-addresses.component.html',
  styleUrls: ['./all-public-addresses.component.scss']
})
export class AllPublicAddressesComponent implements OnInit {
  allPublicAddress: PublicAddress[] = [];
  isLoading = false;
  constructor(
    private publicServiceAddress: PublicAddressService,
    private router : Router
    
    ) {

  }
  ngOnInit(): void {
    this.getAllPublicService();
  }

  getAllPublicService() {
    this.isLoading = true;
    this.publicServiceAddress.getAllPublicAddresses()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (res) => {
          this.allPublicAddress = res;
        },
        error: (err) => {
          // Handle errors here
        }
      })
  }

  registerNewAddress(){
    this.router.navigateByUrl('/register-public-address')
  }

}
