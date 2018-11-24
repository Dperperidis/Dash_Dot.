import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../_models/shoppingcart';
import { User } from '../_models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private subscriptions = new Array<Subscription>();
  cart: ShoppingCart;
  user: User;
  constructor(private cartService: ShoppingCartService, private router: Router) { }

  ngOnInit() {
    this.subscriptions.push(this.cartService.cart$.subscribe(value => {
      this.cart = value;
    }));
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  totalOfItems() {
    let total = 0;
    this.cart.items.forEach(x => {
      total = total + (x.quantity * x.product.totalCost);
    });
    return total;
  }

  nextStep() {
    this.cartService.updateCart(this.cart);
    this.router.navigate(['/payment']);
  }
}
