import { Component, OnInit, OnDestroy, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Color, ProductSize } from '../_models/product';
import { ProdSettingsService } from '../_services/prodsettings.service';
import { ToastrService } from 'ngx-toastr';
import { Message } from '../_models/message';
import { ProductService } from '../_services/product.service';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { ShoppingCart } from '../_models/shoppingcart';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  private subscriptions = new Array<Subscription>();
  quantity = 1;
  size: string;
  product = new Product();
  sizes = new Array<any>();
  color: string;
  productSize = new Array<ProductSize>();
  productSizeColor = new Array<Color>();
  productModal = new Product();
  message = new Message();
  suggestedProducts: Product[];
  checkProduct = true;
  cartItems: ShoppingCart;
  modalRef: BsModalRef;
  sleeve = false;



  constructor(private prodSettings: ProdSettingsService,
    private toastr: ToastrService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private cartService: ShoppingCartService) {
  }



  addToCart() {
    this.cartService.addItemToCart(this.product, this.quantity, this.size, this.color);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    this.subscriptions.push(this.cartService.cart$.subscribe(value => {
      this.cartItems = value;
    }));
    this.productService.getSuggestedProducts().subscribe(res => {
      this.suggestedProducts = res.sort(function (a, b) {
        return 0.5 - Math.random();
      });
    });
    window.scrollTo(0, 0);
    this.product = new Product();
    this.route.data.subscribe(data => {
      this.product = data["product"];
      this.product.productSizes.sort((a, b) => a.sizeId > b.sizeId ? 1 : -1);
      switch (this.product.category) {
        case "Κασκόλ":
          this.checkProduct = false;
          this.onChange('Default');
          break;
        case "Πουκάμισο":
          this.checkProduct = true;
          this.sleeve = true;
          break;
        case "Ζώνη":
          this.checkProduct = true;
          break;
        case "Παπιγιόν":
          this.checkProduct = false;
          this.onChange('Default');
          break;
        case "Γραβάτα":
          this.checkProduct = false;
          this.onChange('Default');
          break;
        case "Καζάκα":
          this.checkProduct = false;
          this.onChange('Default');
          break;
        case "Φουλάρι":
          this.checkProduct = false;
          this.onChange('Default');
          break;
        case "Τιράντα":
          this.checkProduct = false;
          this.onChange('Default');
          break;
        case "Καπέλο":
          this.checkProduct = false;
          this.onChange('Default');
          break;
        case "Σκουφάκι":
          this.checkProduct = false;
          this.onChange('Default');
          break;
        case "Μανικετόκουμπα":
          this.checkProduct = false;
          this.onChange('Default');
          break;
        case "Clip Γραβάτας":
          this.checkProduct = false;
          this.onChange('Default');
          break;
      }
      this.sizes = this.product.productSizes;
    });
    this.onImgChange(this.product.photoUrl);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onChange(size: string) {
    if (size === '') {
      this.productSize = new Array<ProductSize>();
      return;
    }
    this.prodSettings.getColorsBySize(size, this.product.id).subscribe(res => {
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
      this.toastr.error(error);
    });
  }



}






