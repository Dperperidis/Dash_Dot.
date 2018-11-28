import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../_models/shoppingcart';
import { User } from '../_models/User';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private subscriptions = new Array<Subscription>();
  cart: ShoppingCart;
  user: User;
  constructor(private cartService: ShoppingCartService,
    private router: Router, private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.subscriptions.push(this.cartService.cart$.subscribe(value => {
      this.cart = value;
      if (this.cart.items.length === 0) { this.router.navigate(['/cart']); }
    }));
    this.subscriptions.push(this.userService.getUser(this.authService.decodedToken.Id).subscribe(res => {
      console.log(res);
      this.cart.name = res.firstName;
      this.cart.lastname = res.lastName;
      this.cart.email = res.email;
      this.cart.city = res.city;
      this.cart.address = res.address;
      this.cart.zipCode = res.postalCode;
      this.cart.area = res.area;
      this.cart.mobile = res.mobile;
    }, error => {
      this.toastr.error(error);
    }));

  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  checkPaymentMethod(m: number) {
    return this.cart.paymentMethod === m;
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
