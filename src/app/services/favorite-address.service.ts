import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FavoriteAddress } from '../shared/model/model';


@Injectable({
  providedIn: 'root'
})
export class PublicAddressService {

  constructor(private http: HttpClient) {

  }
  getAllPublicAddresses() {
    return this.http.get<FavoriteAddress[]>('http://localhost:3000/favorite-addresses');
  }
  registerPublicAddress(command: any) {
    return this.http.post('http://localhost:3000/favorite-addresses', command);
  }
  deletePublicAddress(id: number) {
    return this.http.delete(`http://localhost:3000/favorite-addresses/${id}`)
  }
  getPublicAddressById(id: number) {
    return this.http.get<FavoriteAddress>(`http://localhost:3000/favorite-addresses/${id}`);

  }
  editPublicAddressById(command: any) {
    return this.http.put(`http://localhost:3000/favorite-addresses/${command.id}`, command);
  }
}
