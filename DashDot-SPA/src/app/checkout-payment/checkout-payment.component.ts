import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { CartItem, Order, PaypalInformation } from '../_models/shoppingcart';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { count } from 'rxjs/operators';
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
      if (this.cart.length === 0) { this.router.navigate(['/checkout']); }
    }));
    this.order = this.cartService.order;
    //σβηνουμε αυτην την γραμμη για τιμη χωρις εκτπωση
    this.order.total = this.totalOfItemsWithPer();
  }

  ngAfterViewInit() {
    if (this.order.paymentMethod === 1) {
      const vm = this;
      paypal.Button.render({
        // Set your environment
        env: 'production', // sandbox | production
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
          production: 'AfNZkMqQlo2B7OvDX9kxal6gNDwTnC78gFgn-tWxmwdzPrZtbOFpYr1R5ScgFZ6N7BCYoHSPckMewutp'
        },
        payment: function (data, actions) {
          return actions.payment.create({
            payment: {
              transactions: [
                { amount: { total: vm.order.total, currency: 'EUR' } }
              ]
            }
          });
        },
        onAuthorize: function (data, actions) {
          return actions.payment.execute()
            .then((res) => {
              vm.setPaypalInfo(res);
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
    //total = this.order.isPickUp ? total : total + 3;
    return total;
  }

  countProducts() {
    let total = 0;
    this.cart.forEach(x => {
      total = total + x.quantity;
    });
    return total;
  }

  totalOfItemsWithPer() {
    let total = 0;
    this.cart.forEach(x => {
      total = total + (x.quantity * x.product.totalCost);
    });
    //total = this.order.isPickUp ? total : total + 3;
    return total - (total / 100) * 20;
  }

  setPaypalInfo(info: any) {
    const pp = new PaypalInformation();
    pp.payerId = info.payer.payer_info.payer_id;
    pp.payerEmail = info.payer.payer_info.email;
    pp.payerName = info.payer.payer_info.first_name;
    pp.payerMiddleName = info.payer.payer_info.middle_name;
    pp.payerLastname = info.payer.payer_info.last_name;
    pp.payerAddress = info.payer.payer_info.shipping_address.line1;
    pp.payerCity = info.payer.payer_info.shipping_address.city;
    pp.currency = info.transactions[0].amount.currency;
    pp.paypalId = info.id;
    pp.cartId = info.cart;
    pp.createTime = info.create_time;
    pp.intent = info.intent;
    pp.state = info.state;
    pp.total = info.transactions[0].amount.total;
    this.order.paypalInformation = pp;
    this.finalizeOrder();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }



  finalizeOrder() {
    // τιμη χωρις εκπτψωση
    // this.order.total = this.totalOfItemsWith()
    this.order.total = this.totalOfItemsWithPer();
    this.cartService.placeOrder(this.order).subscribe(res => {
      this.toastr.success('Η παραγγελία σας καταχωρήθηκε με επιτυχία');
      this.cartService.order = new Order();
      this.cartService.clearcCartItemsFromLS();
      this.cartService.cart = new Array<CartItem>();
      this.router.navigate(['/finalize']);
    }, error => {
      this.toastr.error(error, '', {
        positionClass: 'bottom-center'
      });
    });
  }

  paypalText() {
    return 'Το PayPal αποτελεί έναν σύγχρονο και ασφαλή τρόπο συναλλαγών.' +
      'Πατώντας το κουμπί της Paypal θα κατευθυνθείτε στο ασφαλές περιβάλλον του paypal για να ολοκληρώσετε τη συναλλαγή σας.';
  }

  codText() {
    return 'Επιλέξατε να πληρώσετε με μετρητά/κάρτα';
  }

}
