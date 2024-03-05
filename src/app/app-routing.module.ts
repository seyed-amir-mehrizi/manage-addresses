import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPublicAddressesComponent } from './pages/public-address/all-public-addresses/all-public-addresses.component';
import { RegisterPublicAddressComponent } from './pages/public-address/register-public-address/register-public-address.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { AllFavoriteAddressComponent } from './pages/favorite-address/all-favorite-address/all-favorite-address.component';
import { AuthGuard } from './core/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterFavoriteAddressComponent } from './pages/favorite-address/register-favorite-address/register-favorite-address.component';

const routes: Routes = [
  { path: '', redirectTo: '/public-address', pathMatch: 'full' },
  { path: 'public-address', component: AllPublicAddressesComponent },
  { path: 'register-public-address', component: RegisterPublicAddressComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-info', component: UserInfoComponent, canActivate: [AuthGuard] },
  { path: 'favorite-address', component: AllFavoriteAddressComponent, canActivate: [AuthGuard] },
  { path: 'register-favorite-address', component: RegisterFavoriteAddressComponent, canActivate: [AuthGuard] },

  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
