import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PublicAddress } from '../shared/model/model';

@Injectable({
  providedIn: 'root'
})
export class PublicAddressService {

  constructor(private http: HttpClient) { 

  }
  getAllPublicAddresses(){
    return this.http.get<PublicAddress[]>('http://localhost:3000/public-addresses');
  }
}
