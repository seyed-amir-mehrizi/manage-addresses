import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PublicAddress } from '../shared/model/model';

@Injectable({
  providedIn: 'root'
})
export class PublicAddressService {

  constructor(private http: HttpClient) {

  }
  getAllPublicAddresses() {
    return this.http.get<PublicAddress[]>('http://localhost:3000/public-addresses');
  }
  registerPublicAddress(command: any) {
    return this.http.post('http://localhost:3000/public-addresses', command);
  }
  deletePublicAddress(id: number) {
    return this.http.delete(`http://localhost:3000/public-addresses/${id}`)
  }
}
