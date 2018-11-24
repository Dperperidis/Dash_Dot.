import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { ShoppingCart } from '../_models/shoppingcart';
declare var paypal: any;
@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscriptions = new Array<Subscription>();
  cart: ShoppingCart;
  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.subscriptions.push(this.cartService.cart$.subscribe(value => {
      this.cart = value;
      console.log(this.cart);
    }));
  }

  ngAfterViewInit() {
    paypal.Button.render({
      // Set your environment
      env: 'sandbox', // sandbox | production
      // Specify the style of the button
      style: {
        layout: 'horizontal',  // horizontal | vertical
        size: 'medium',    // medium | large | responsive
        shape: 'rect',      // pill | rect
        color: 'gold'       // gold | blue | silver | white | black
      },

      // Specify allowed and disallowed funding sources
      //
      // Options:
      // - paypal.FUNDING.CARD
      // - paypal.FUNDING.CREDIT
      // - paypal.FUNDING.ELV
      funding: {
        allowed: [
          paypal.FUNDING.CARD,
          paypal.FUNDING.CREDIT
        ],
        disallowed: []
      },
      // Enable Pay Now checkout flow (optional)
      commit: true,
      // PayPal Client IDs - replace with your own
      // Create a PayPal app: https://developer.paypal.com/developer/applications/create
      client: {
        sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
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
          .then(function () {
            window.alert('Payment Complete!');
          });
      }
    }, '#paypal-button-container');
  }

  totalOfItems() {
    let total = 0;
    this.cart.items.forEach(x => {
      total = total + (x.quantity * x.product.totalCost);
    });
    return total;
  }

  countProducts() {
    let total = 0;
    this.cart.items.forEach(x => {
      total = total + x.quantity;
    });
    return total;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
