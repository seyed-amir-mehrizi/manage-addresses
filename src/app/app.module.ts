import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AllPublicAddressesComponent } from './pages/public-address/all-public-addresses/all-public-addresses.component';
import { RegisterPublicAddressComponent } from './pages/public-address/register-public-address/register-public-address.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from './core/baseUrl.interceptor';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { AllFavoriteAddressComponent } from './pages/favorite-address/all-favorite-address/all-favorite-address.component';
import { RegisterFavoriteAddressComponent } from './pages/favorite-address/register-favorite-address/register-favorite-address.component';
@NgModule({
  declarations: [
    AppComponent,
    AllPublicAddressesComponent,
    RegisterPublicAddressComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    UserInfoComponent,
    AllFavoriteAddressComponent,
    RegisterFavoriteAddressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      positionClass:'toast-top-left',
      timeOut:5000,
      closeButton:true
    }),
    NgbCollapseModule
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
