import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Color, ProductSize } from '../_models/product';
import { ProdSettingsService } from '../_services/prodsettings.service';
import { ToastrService } from 'ngx-toastr';
import { Message } from '../_models/message';
import { ProductService } from '../_services/product.service';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { ShoppingCart } from '../_models/shoppingcart';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  private subscriptions = new Array<Subscription>();
  quantity = 1;
  product = new Product();
  sizes = new Array<any>();
  color: Color;
  productSize = new Array<ProductSize>();
  productSizeColor = new Array<Color>();
  productModal = new Product();
  message = new Message();
  checkProduct = true;
  cartItems: ShoppingCart;
  constructor(private prodSettings: ProdSettingsService,
    private toastr: ToastrService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService) {
  }

  addToCart() {
    this.cartService.addItemToCart(this.product, this.quantity);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    this.subscriptions.push(this.cartService.cart$.subscribe(value => {
      this.cartItems = value;
    }));
    window.scrollTo(0, 0);
    this.route.data.subscribe(data => {
      this.product = data["product"];
      this.product.productSizes.sort((a, b) => a.sizeId > b.sizeId ? 1 : -1);
      switch (this.product.category) {
        case "Κασκόλ":
          this.checkProduct = false;
          this.onChange(17);
          break;
        case "Παπιγιόν":
          this.checkProduct = false;
          this.onChange(17);
          break;
        case "Γραβάτα":
          this.checkProduct = false;
          this.onChange(17);
          break;
        case "Καζάκα":
          this.checkProduct = false;
          this.onChange(17);
          break;
        case "Φουλάρι":
          this.checkProduct = false;
          this.onChange(17);
          break;
        case "Τιράντα":
          this.checkProduct = false;
          this.onChange(17);
          break;
        case "Καπέλο":
          this.checkProduct = false;
          this.onChange(17);
          break;
        case "Σκουφάκι":
          this.checkProduct = false;
          this.onChange(17);
          break;
        case "Μανικετόκουμπα":
          this.checkProduct = false;
          this.onChange(17);
          break;
        case "Clip Γραβάτας":
          this.checkProduct = false;
          this.onChange(17);
          break;
      }
    });
    this.sizes = this.product.productSizes;
    this.productModal.photoUrl = this.product.photoUrl;
  }

  onChange(sizeId: number) {
    if (sizeId === 0) {
      this.productSize = new Array<ProductSize>();
      return;
    }
    this.prodSettings.getColorsBySize(sizeId, this.product.id).subscribe(res => {
      this.productSize = res;
    }, error => {
      this.toastr.error(error);
    });
  }

  onImgChange(imgUrl) {
    this.product.photoUrl = imgUrl;
    this.productModal.photoUrl = imgUrl;
  }
  onImgModalChange(imgUrl) {
    this.productModal.photoUrl = imgUrl;
  }

  saveMessage() {
    this.message.code = this.product.code;
    this.productService.saveMessage(this.message).subscribe(res => {
      this.toastr.show('Το μήνυμα στάλθηκε επιτυχώς');
      console.log(res);
      this.message = new Message();
    }, error => {
      this.toastr.error('Δεν ήταν δυνατή η αποστολή μηνύματος. Προσπάθησε πάλι σε λίγο.');
    });
  }

}



