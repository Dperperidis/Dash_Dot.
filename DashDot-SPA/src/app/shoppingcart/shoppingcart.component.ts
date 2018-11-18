import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../_models/shoppingcart';
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

  sendOrder() {
    this.cartService.sendOrder(this.cartItems).subscribe(res => {
      console.log(res);
    }, error => {
      this.toastr.error(error);
    });
  }

}
