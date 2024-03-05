import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { FavoriteAddressService } from 'src/app/services/favorite-address.service';
import { FavoriteAddress } from 'src/app/shared/model/model';

@Component({
  selector: 'app-all-favorite-address',
  templateUrl: './all-favorite-address.component.html',
  styleUrls: ['./all-favorite-address.component.scss']
})
export class AllFavoriteAddressComponent implements OnInit {
  allFavoriteAddress: FavoriteAddress[] = [];
  isLoading = false;
  constructor(
    private favoriteServiceAddress: FavoriteAddressService,
    private router: Router,
    private toastr: ToastrService,

  ) {

  }
  ngOnInit(): void {
    this.getAllFavoriteService();
  }

  getAllFavoriteService() {
    this.isLoading = true;
    this.favoriteServiceAddress.getAllFavoriteAddresses()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (res) => {
          this.allFavoriteAddress = res;
        },
        error: (err) => {
          // Handle errors here
        }
      })
  }

  registerNewAddress() {
    this.router.navigateByUrl('/register-favorite-address')
  }

  deleteFavoriteAddress(item: FavoriteAddress) {
    this.favoriteServiceAddress.deleteFavoriteAddress(item.id)
      .subscribe((res) => {
        this.toastr.success(`The ${item.name} Address is Deleted Successfully`);
        this.getAllFavoriteService();
      })
  }

  editFavoriteAddress(id: number) {
    this.router.navigate(['/register-favorite-address'], { state: { id } })
  }

}
