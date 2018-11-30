import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart, Item } from '../_models/shoppingcart';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit, OnDestroy {
  private subscriptions = new Array<Subscription>();
  cartItems = new ShoppingCart();
  userCartId = null;


  constructor(private cartService: ShoppingCartService, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {

    this.subscriptions.push(this.cartService.cart$.subscribe(value => {
      this.cartItems = value;
    }));

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  changeQuantity(item: Item, add: boolean, i: number) {
    if (this.cartItems.items[i].quantity === 1 && !add) { return; }
    this.cartItems.items[i].quantity = add ? this.cartItems.items[i].quantity + 1 : this.cartItems.items[i].quantity - 1;
    this.cartService.updateCart(this.cartItems);
  }

  deleteItem(i: number) {
    this.cartService.removeItemFromCart(i);
  }

  totalOfItems() {
    let total = 0;
    this.cartItems.items.forEach(x => {
      total = total + (x.quantity * x.product.totalCost);
    });
    return total;
  }

}
