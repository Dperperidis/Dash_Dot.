import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Order } from '../_models/shoppingcart';
import { Product } from '../_models/product';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './localstorage.service';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  baseUrl = environment.apiUrl;
  private cartSubject$ = new BehaviorSubject<Array<CartItem>>(new Array<CartItem>());
  cart$ = this.cartSubject$.asObservable();
  private orderSubject$ = new BehaviorSubject<Order>(new Order());
  order$ = this.orderSubject$.asObservable();
  get order(): Order { return this.orderSubject$.getValue(); }
  set order(value: Order) { this.orderSubject$.next(value); }

  get cart(): Array<CartItem> { return this.cartSubject$.getValue(); }
  set cart(value: Array<CartItem>) { this.cartSubject$.next(value); }

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private localstorage: LocalStorageService,
    private auth: AuthService) {
    if (this.auth.loggedIn()) {
      this.getCartOnDemand();
    }
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

  addItemToCart(product: Product, q: number, s: string, c: string, cId: number) {
    const i = this.cart.findIndex(x => x.productId === product.id && x.color === c && x.size === s);
    if (i > -1) {
      if (this.auth.loggedIn()) {
        this.cart[i].quantity = this.cart[i].quantity + q;
        this.updateItem(this.cart[i], i);
      } else {
        this.cart[i].quantity = this.cart[i].quantity + q;
        this.cart = this.cart;
        this.localstorage.setShoppingCart(this.cart);
      }
    } else {
      const item = new CartItem();
      item.product = product;
      item.productId = product.id;
      item.quantity = q;
      item.color = c;
      item.size = s;
      const photoUrl = product.photos.find(x => x.colorPointer === cId);
      item.photoUrl = photoUrl ? photoUrl.url : null;
      if (this.auth.loggedIn()) {
        this.addCartItem(item).subscribe(res => {
          this.cart.push(res);
          this.cart = this.cart;
          this.toastr.success('Το Προιόν προστέθηκε στο καλάθι σας.','',{
            positionClass: 'toast-top-center'
          });
        }, error => {
          this.toastr.error(error);
        });
      } else {
        this.cart.push(item);
        this.cart = this.cart;
        this.toastr.success('Το Προιόν προστέθηκε στο καλάθι σας.','',{
          positionClass: 'toast-top-center'
        });
        this.localstorage.setShoppingCart(this.cart);
      }
    }

  }

  removeItemFromCart(i: number) {
    if (i > -1) {
      if (this.auth.loggedIn()) {
        this.removeCartItem(this.cart[i].id).subscribe(res => {
          this.toastr.success('Το προιόν αφαιρέθηκε απο το καλάθι σας με επιτυχία.');
          this.cart.splice(i, 1);
          this.cart = this.cart;
        }, error => {
          this.toastr.error('Το προϊόν έχει διαγραφτεί');
        });
        this.cart = this.cart;
      } else {
        this.cart.splice(i, 1);
        this.cart = this.cart;
        this.toastr.success('Το προιόν αφαιρέθηκε απο το καλάθι σας με επιτυχία.');
        this.localstorage.setShoppingCart(this.cart);
      }
    }
  }

  clearcCartItemsFromLS() {
    localStorage.removeItem('shoppingcart');
  }

  updateItem(item: CartItem, i: number) {
    if (this.auth.loggedIn()) {
      this.updateCartItem(item).subscribe(res => {
        this.cart[i] = res;
        this.cart = this.cart;
        this.toastr.success('Το προιόν επεξεργάστηκε επιτυχώς');
      }, error => {
        this.toastr.error(error);
      });
    } else {
      this.cart[i] = item;
      this.cart = this.cart;
      this.localstorage.setShoppingCart(this.cart);
    }
  }

  getCartOnDemand() {
    // if cart has items before logged in it will send them to server
    // and sync them with the cart in the db
    if (this.cart.length > 0) {
      this.syncCarts(this.cart).subscribe(res => {
        this.cart = res;
        this.localstorage.removeCartFromStorage();
      }, error => {
        this.toastr.error(error);
      });
    } else {
      this.getUserCart().subscribe(res => {
        this.cart = res;
      }, error => {
        this.toastr.error(error);
      });
    }
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
  private removeCartItem(itemId: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'shoppingCart/remove/cart/item/' + itemId);
  }
  // Delete All cart Items
  clearCart(): Observable<any> {
    return this.http.delete(this.baseUrl + 'shoppingCart/clear/cart');
  }

  // ORDERS
  placeOrder(order: Order): Observable<string> {
    return this.http.post<string>(this.baseUrl + 'shoppingCart/place/order', order);
  }

  verifyOrder(order: Order): Observable<true> {
    return this.http.post<true>(this.baseUrl + 'shoppingCart/verify/order', order);
  }

}
