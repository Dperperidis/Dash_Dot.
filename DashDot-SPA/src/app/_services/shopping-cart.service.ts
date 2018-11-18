import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShoppingCart, Item } from '../_models/shoppingcart';
import { Product } from '../_models/product';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  baseUrl = environment.apiUrl;
  private cartSubject$ = new BehaviorSubject<ShoppingCart>(new ShoppingCart());
  cart$ = this.cartSubject$.asObservable();

  get cart(): ShoppingCart { return this.cartSubject$.getValue(); }

  set cart(value: ShoppingCart) { this.cartSubject$.next(value); }

  constructor(private http: HttpClient) {
    
   }

  addItemToCart(product: Product, q: number, s: string, c:string) {
    const item = new Item();
    item.product = product;
    item.productId = product.id;
    item.quantity = q;
    item.color = c;
    item.size = s;
    this.cart.items.push(item);
  }

  removeItemToCart(productId: number) {
    const i = this.cart.items.findIndex(x => x.id === productId);
    this.cart.items.splice(i, 1);
  }

  updateCart(c: ShoppingCart) {
    this.cart = c;
  }

  sendOrder(cart: ShoppingCart): Observable<ShoppingCart> {
    return this.http.post<ShoppingCart>(this.baseUrl + 'shoppingcart/insert', cart);
  }
}
