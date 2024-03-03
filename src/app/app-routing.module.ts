import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPublicAddressesComponent } from './pages/public-address/all-public-addresses/all-public-addresses.component';

const routes: Routes = [
  { path: '', redirectTo: '/public-address' , pathMatch:'full'  },
  { path: 'public-address', component: AllPublicAddressesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
