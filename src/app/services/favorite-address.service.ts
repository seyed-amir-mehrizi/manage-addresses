import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FavoriteAddress } from '../shared/model/model';


@Injectable({
  providedIn: 'root'
})
export class FavoriteAddressService {

  constructor(private http: HttpClient) {

  }
  getAllFavoriteAddresses() {
    return this.http.get<FavoriteAddress[]>('http://localhost:3000/favorite-addresses');
  }
  registerFavoriteAddress(command: any) {
    return this.http.post('http://localhost:3000/favorite-addresses', command);
  }
  deleteFavoriteAddress(id: number) {
    return this.http.delete(`http://localhost:3000/favorite-addresses/${id}`)
  }
  getFavoriteAddressById(id: number) {
    return this.http.get<FavoriteAddress>(`http://localhost:3000/favorite-addresses/${id}`);

  }
  editFavoriteAddressById(command: any) {
    return this.http.put(`http://localhost:3000/favorite-addresses/${command.id}`, command);
  }
  getAddressDetailsByText(command:string){
    return this.http.get(`https://nominatim.openstreetmap.org/search?addressdetails=1&q=${command}&format=jsonv2&limit=1`)
  }
}
