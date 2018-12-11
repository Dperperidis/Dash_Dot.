import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { CartItem, Order } from '../_models/shoppingcart';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var paypal: any;
@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscriptions = new Array<Subscription>();
  cart = new Array<CartItem>();
  order = new Order();
  constructor(private cartService: ShoppingCartService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (!this.cartService.order.lastName && !this.cartService.order.email) {
      this.router.navigate(['/checkout']);
    }
    this.subscriptions.push(this.cartService.cart$.subscribe(value => {
      this.cart = value;
      // if (this.cart.length === 0) { this.router.navigate(['/checkout']); }
    }));
    this.order = this.cartService.order;
  }

  ngAfterViewInit() {
    if (this.order.paymentMethod === 1) {
      paypal.Button.render({
        // Set your environment
        env: 'sandbox', // sandbox | production
        style: {
          layout: 'horizontal',  // horizontal | vertical
          size: 'medium',    // medium | large | responsive
          shape: 'rect',      // pill | rect
          color: 'gold'       // gold | blue | silver | white | black
        },
        funding: {
          allowed: [
            paypal.FUNDING.CARD,
            paypal.FUNDING.CREDIT
          ],
          disallowed: []
        },
        // Enable Pay Now checkout flow (optional)
        commit: true,
        client: {
          sandbox: 'AWpVYPhNs6uU0arnnioVy8viPalsSesYIKYMH9_gfgPGpkexulbvD5s4br9F_mKTXsP4BHiZG44EakYV',
          production: '<insert production client id>'
        },
        payment: function (data, actions) {
          return actions.payment.create({
            payment: {
              transactions: [
                { amount: { total: '0.01', currency: 'EUR' } }
              ]
            }
          });
        },
        onAuthorize: function (data, actions) {
          return actions.payment.execute()
            .then(function (res) {
              console.log(res);
            });
        }
      }, '#paypal-button-container');
    }
  }

  totalOfItems() {
    let total = 0;
    this.cart.forEach(x => {
      total = total + (x.quantity * x.product.totalCost);
    });
    return total;
  }

  countProducts() {
    let total = 0;
    this.cart.forEach(x => {
      total = total + x.quantity;
    });
    return total;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  finalizeOrder() {
    this.cartService.placeOrder(this.order).subscribe(res => {
      this.toastr.success('Η παραγγελία σας καταχωρήθηκε με επιτυχία');
      this.router.navigate(['/finalize']);
    }, error => {
      this.toastr.error(error);
    });
  }

  paypalText() {
    return 'Το PayPal αποτελεί έναν σύγχρονο και ασφαλή τρόπο συναλλαγών.' +
      'Πατώντας το κουμπι της Paypal θα κατευθυνθείτε στο ασφαλές περιβάλλον του paypal για να ολοκληρώσετε τη συναλλαγή σας.';
  }

  codText() {
    return 'Επιλέγατε να πληρώσετε με αντικαταβολή';
  }

}
