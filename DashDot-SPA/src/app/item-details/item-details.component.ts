import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Color, ProductSize } from '../_models/product';
import { ProdSettingsService } from '../_services/prodsettings.service';
import { ToastrService } from 'ngx-toastr';
import { Message } from '../_models/message';
import { ProductService } from '../_services/product.service';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { CartItem } from '../_models/shoppingcart';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Location } from '@angular/common';



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
  productSize = new ProductSize();
  productSizeColor = new Array<Color>();
  productModal = new Product();
  message = new Message();
  suggestedProducts: Product[];
  checkProduct = true;
  cart: Array<CartItem>;
  modalRef: BsModalRef;
  sleeve = false;
  checkSize = true;
  checkColor = true;
  colors = [];


  constructor(private prodSettings: ProdSettingsService,
    private toastr: ToastrService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private cartService: ShoppingCartService,
    private _location: Location) {
  }

  addToCart() {
    if ((this.color == '' || this.color == null) && this.size == null) {
      this.checkSize = false;
      this.checkColor = false;
      return;
    } else if(this.color == '' || this.color == null) {
      this.checkColor = false;
      this.checkSize= true;
    } else {
      const id = this.colors.find(x => x.title === this.color).id;
      this.cartService.addItemToCart(this.product, this.quantity, this.size, this.color, id);
    }
  }

  backClicked() {
    this._location.back();
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  setPhoto(value) {
    if (value == '') {
      return;
    } else {
      const y = this.colors.find(x => x.title == value);
      this.product.photoUrl = this.product.photos.find(x => x.colorPointer == y.id).url;
    }
    this.checkColor = true;
  }

  ngOnInit() {
    this.subscriptions.push(this.cartService.cart$.subscribe(value => {
      this.cart = value;
    }));
    this.prodSettings.getColors().subscribe(res => {
      this.colors = res;
    });
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
          this.checkProduct = true;
          this.sleeve = true;
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
        case "Ζακέτα":
          break;
        case "Γιλέκο":
          break;
        case "Πουλόβερ":   
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
      this.productSize = new ProductSize();
      return;
    }
    this.prodSettings.getColorsBySize(size, this.product.id).subscribe(res => {
      this.productSize = res;
    }, error => {
      this.toastr.error(error);
    });
    this.checkSize = true;
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
      this.toastr.show('Το μήνυμα στάλθηκε επιτυχώς','',{
        positionClass: 'toast-bottom-left'
      });
      this.message = new Message();
    }, error => {
      this.toastr.error(error);
    });
  }

}






