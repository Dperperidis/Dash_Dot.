import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { CartItem, Order } from '../_models/shoppingcart';
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
  cart: Array<CartItem>;
  user: User;
  order = new Order();
  validShop = false;
  gdp = false;
  errorText;
  stores = [
    { title: "Κατάστημα Ιλίου" },
    { title: "Κατάστημα Χαλανδρίου" },
    { title: "Κατάστημα Παγκρατίου" },
    { title: "Κατάστημα Κολωνακίου" },
    { title: "Κατάστημα Πειραιά" },
    { title: "Κατάστημα Νέας Σμύρνης" },
    { title: "Κατάστημα Περιστερίου" },
    { title: "Κατάστημα Πάτρας" }
  ];
  constructor(private cartService: ShoppingCartService,
    private router: Router, private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.order.store = this.stores[0].title;
    this.subscriptions.push(this.cartService.cart$.subscribe(value => {
      this.cart = value;
    }));
    this.subscriptions.push(this.userService.getUser(this.authService.decodedToken.Id).subscribe(res => {
      this.order.firstName = res.firstName;
      this.order.lastName = res.lastName;
      this.order.email = res.email;
      this.order.city = res.city;
      this.order.address = res.address;
      this.order.postalCode = res.postalCode;
      this.order.area = res.area;
      this.order.mobile = res.mobile;
      this.cartService.order = this.order;
      this.user = res;
    }, error => {
      this.toastr.error(error);
    }));

  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  checkPaymentMethod(m: number) {
    return this.order.paymentMethod === m;
  }

  checkShippmanet(info: boolean) {
    return this.order.isPickUp === info;
  }

  totalOfItems() {
    let total = 0;
    this.cart.forEach(x => {
      total = total + (x.quantity * x.product.totalCost);
    });
    total = this.order.isPickUp ? total : total + 3;
    return total ;
  }


  // timh me ekptwsh
  // totalOfItemsWithPer() {
  //   let total = 0;
  //   this.cart.forEach(x => {
  //     total = total + (x.quantity * x.product.totalCost);
  //   });
  //   //total = this.order.isPickUp ? total : total + 3;
  //   return total - (total/100)*20 ;
  // }


     // timh xwris ekptwsh

  nextStep() {
    this.order.total = this.totalOfItems();
    this.cartService.order = this.order;
    if (this.cart.length === 0) {
      this.toastr.warning('To καλάθι σας είναι άδειο');
      return;
    }
    this.cartService.verifyOrder(this.order).subscribe(res => {
      if (res) {
        this.router.navigate(['/payment']);
      }
    }, error => {
      this.validShop = true;
      this.errorText = error
      
    });
    this.user.area = this.order.area;
    this.user.mobile = this.order.mobile;
    this.user.city = this.order.city;
    this.user.postalCode = this.order.postalCode;
    this.user.address = this.order.address;
    this.userService.updateUser(this.user).subscribe(res=>{
    });
  }


}
