import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../_models/shoppingcart';
import { Product } from '../_models/product';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  baseUrl = environment.apiUrl;
  private cartSubject$ = new BehaviorSubject<Array<CartItem>>(new Array<CartItem>());
  cart$ = this.cartSubject$.asObservable();

  get cart(): Array<CartItem> { return this.cartSubject$.getValue(); }

  set cart(value: Array<CartItem>) { this.cartSubject$.next(value); }

  constructor(private http: HttpClient, private localstorage: LocalStorageService) {
    const cart = this.getCartFromLocalStorage();
    if (cart) {
      const cr = new Date();
      const now = new Date();
      if (cr.setHours(0, 0, 0, 0) === now.setHours(0, 0, 0, 0)) {
        this.cart = cart;
      } else {
        localStorage.removeItem('shoppingcart');
      }
    }
  }

  getCartFromLocalStorage(): Array<CartItem> | null {
    return this.localstorage.getShoppingCart();
  }

  addItemToCart(product: Product, q: number, s: string, c: string) {
    const i = this.cart.findIndex(x => x.productId === product.id && x.color === c && x.size === s);
    if (i > -1) {
      this.cart[i].quantity = this.cart[i].quantity + q;
    } else {
      const item = new CartItem();
      item.product = product;
      item.productId = product.id;
      item.quantity = q;
      item.color = c;
      item.size = s;
      this.cart.push(item);
    }
    this.localstorage.setShoppingCart(this.cart);
  }

  removeItemFromCart(i: number) {
    if (i > -1) {
      this.cart.splice(i, 1);
      this.localstorage.setShoppingCart(this.cart);
    }
  }

  updateCart(c: Array<CartItem>) {
    this.cart = c;
    this.localstorage.setShoppingCart(this.cart);
  }
  // Syncs the cart of an offline user with the cart he has in the database after he logs in
  syncCarts(items: Array<CartItem>): Observable<Array<CartItem>> {
    return this.http.post<Array<CartItem>>(this.baseUrl + 'shoppingCart/sync/carts', items);
  }
  // Just add new cart item to the database
  addCartItem(item: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.baseUrl + 'shoppingCart/add/item/cart', item);
  }
  // Just update an existing cart item to the database
  updateCartItem(item: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(this.baseUrl + 'shoppingCart/update/item/cart', item);
  }
  // Get users cart from the database
  getUserCart(): Observable<Array<CartItem>> {
    return this.http.get<Array<CartItem>>(this.baseUrl + 'shoppingCart/get/cart');
  }
  // Remove the selected item from the cart
  removeCartItem(itemId: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'shoppingCart/remove/cart/item/' + itemId);
  }
  // Delete All cart Items
  clearCart(): Observable<any> {
    return this.http.delete(this.baseUrl + 'shoppingCart/clear/cart');
  }

}
