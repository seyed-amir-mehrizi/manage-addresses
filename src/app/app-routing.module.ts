import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPublicAddressesComponent } from './pages/public-address/all-public-addresses/all-public-addresses.component';
import { RegisterPublicAddressComponent } from './pages/public-address/register-public-address/register-public-address.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/public-address', pathMatch: 'full' },
  { path: 'public-address', component: AllPublicAddressesComponent },
  { path: 'register-public-address', component: RegisterPublicAddressComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
