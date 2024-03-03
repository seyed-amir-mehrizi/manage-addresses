import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AllPublicAddressesComponent } from './pages/public-address/all-public-addresses/all-public-addresses.component';
import {  HttpClientModule } from '@angular/common/http';
import { RegisterPublicAddressComponent } from './pages/public-address/register-public-address/register-public-address.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    AllPublicAddressesComponent,
    RegisterPublicAddressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
