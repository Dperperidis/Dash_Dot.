import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { CartItem } from '../_models/shoppingcart';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit, OnDestroy {
  private subscriptions = new Array<Subscription>();
  cart = new Array<CartItem>();
  userCartId = null;


  constructor(private cartService: ShoppingCartService, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.subscriptions.push(this.cartService.cart$.subscribe(value => {
      this.cart = value;
    }));

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  changeQuantity(item: CartItem, add: boolean, i: number) {
    if (this.cart[i].quantity === 1 && !add) { return; }
    this.cart[i].quantity = add ? this.cart[i].quantity + 1 : this.cart[i].quantity - 1;
    this.cartService.updateItem(this.cart[i], i);
  }

  deleteItem(i: number) {
    this.cartService.removeItemFromCart(i);
  }

  totalOfItems() {
    let total = 0;
    this.cart.forEach(x => {
      total = total + (x.quantity * x.product.totalCost);
    });
    return total;
  }

}
