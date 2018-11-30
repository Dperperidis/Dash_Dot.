import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ShoppingCart } from '../_models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  createCart(shopping: ShoppingCart, userId?): Observable<ShoppingCart> {
    return this.http.post<ShoppingCart>(this.baseUrl + 'customers/addShopCart', shopping + userId);
  }
}
