import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_models/product';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartItem } from '../_models/shoppingcart';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit, OnDestroy {
  box = true;
  list = false;
  product = new Array<Product>();
  tempProduct: any[] = [];
  category = true;
  sizeCategory = false;
  sleeve = false;
  hide = false;
  cart: Array<CartItem>;
  pageNumber = 1;
  pageSize = 16;

  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) {
  }

  ngOnInit() {
   window.scrollTo(0, 0);
    if (sessionStorage.getItem('page')) {
      this.pageSize = parseInt(sessionStorage.getItem('page'));
      sessionStorage.removeItem('page');
    }
    this.route.params.subscribe((param: Params) => {
      const id = param['id'];
      switch (id) {
        case "slim-fit":
          const x = "Slim-Fit";
          sessionStorage.setItem('id', x);
          this.productService.getProductsByLine(x, this.pageNumber, this.pageSize).subscribe(res => {
            this.product = res.result;
            this.tempProduct = res.result;
            this.sleeve = true;
            this.sortBySize(sessionStorage.getItem('size'));
            sessionStorage.removeItem('order');
            sessionStorage.removeItem('size');
            sessionStorage.removeItem('value');
          });
          break;
        case "regular-fit":
          const y = "Regular-Fit";
          sessionStorage.setItem('id', y);
          sessionStorage.setItem('value', 'Μακρυμάνικο');
          this.productService.getProductsByLine(y, this.pageNumber, this.pageSize).subscribe(res => {
            this.product = res.result;
            this.tempProduct = res.result;
            this.sleeve = true;
            this.sortBySize(sessionStorage.getItem('size'));
            sessionStorage.removeItem('value');
            sessionStorage.removeItem('size');
            sessionStorage.removeItem('order');
          });
          break;
        case "cardigans":
          const a = "Ζακέτα";
          sessionStorage.setItem('id', a);
          this.productService.getProductsByCategory(a, this.pageNumber, this.pageSize).subscribe(res => {
            this.product = res.result;
            this.tempProduct = res.result;
            sessionStorage.removeItem('order');
            sessionStorage.removeItem('size');

          });
          break;
        case "sweaters":
          const b = "Πουλόβερ";
          sessionStorage.setItem('id', b);
          this.productService.getProductsByCategory(b, this.pageNumber, this.pageSize).subscribe(res => {
            this.product = res.result;
            this.tempProduct = res.result;
            sessionStorage.removeItem('order');
            sessionStorage.removeItem('size');

          });
          break;
        case "sweater-Vests":
          const c = "Καζάκα";
          sessionStorage.setItem('id', c);
          this.productService.getProductsByCategory(c, this.pageNumber, this.pageSize).subscribe(res => {
            this.product = res.result;
            this.tempProduct = res.result;
            sessionStorage.removeItem('order');
            sessionStorage.removeItem('size');

          });
          break;
        case "vests":
          const d = "Γιλέκο";
          sessionStorage.setItem('id', d);
          this.productService.getProductsByCategory(d, this.pageNumber, this.pageSize).subscribe(res => {
            this.product = res.result;
            this.tempProduct = res.result;
            sessionStorage.removeItem('order');
            sessionStorage.removeItem('size');
          });
          break;
        case "ties":
          const e = "Γραβάτα";
          sessionStorage.setItem('id', e);
          this.productService.getProductsByCategory(e, this.pageNumber, this.pageSize).subscribe(res => {
            this.product = res.result;
            this.tempProduct = res.result;
            this.category = false;
            sessionStorage.removeItem('size');
            sessionStorage.removeItem('order');
          });
          break;
        case "bow-tie":
          const f = "Παπιγιόν";
          sessionStorage.setItem('id', f);
          this.productService.getProductsByCategory(f, this.pageNumber, this.pageSize).subscribe(res => {
            this.product = res.result;
            this.tempProduct = res.result;
            this.category = false;
            sessionStorage.removeItem('size');
            sessionStorage.removeItem('order');

          });
          break;
        case "cuff-links":
          const g = "Μανικετόκουμπα";
          sessionStorage.setItem('id', g);
          this.productService.getProductsByCategory(g, this.pageNumber, this.pageSize).subscribe(res => {
            this.product = res.result;
            this.tempProduct = res.result;
            this.category = false;
            sessionStorage.removeItem('size');
            sessionStorage.removeItem('order');
          });
          break;
        case "ties-clip":
          const o = "Clip Γραβάτας";
          sessionStorage.setItem('id', o);
          this.productService.getProductsByCategory(o, this.pageNumber, this.pageSize).subscribe(res => {
            this.product = res.result;
            this.tempProduct = res.result;
            this.category = false;
            sessionStorage.removeItem('size');
            sessionStorage.removeItem('order');
          });
          break;
        case "beanies":
          const i = "Σκουφάκι";
          sessionStorage.setItem('id', i);
          this.productService.getProductsByCategory(i, this.pageNumber, this.pageSize).subscribe(res => {
            this.product = res.result;
            this.tempProduct = res.result;
            this.category = false;
            sessionStorage.removeItem('size');
            sessionStorage.removeItem('order');
          });
          break;
        case "scarfs":
          const j = "Φουλάρι";
          sessionStorage.setItem('id', j);
          this.productService.getProductsByCategory(j, this.pageNumber, this.pageSize).subscribe(res => {
            this.product = res.result;
            this.tempProduct = res.result;
            this.category = false;
            sessionStorage.removeItem('size');
            sessionStorage.removeItem('order');
          });
          break;
        case "belts":
          const k = "Ζώνη";
          sessionStorage.setItem('id', k);
          this.productService.getProductsByCategory(k, this.pageNumber, this.pageSize).subscribe(res => {
            this.product = res.result;
            this.tempProduct = res.result;
            this.sizeCategory = true;
            this.category = true;
            this.sortBySize(sessionStorage.getItem('size'));
            sessionStorage.removeItem('order');
            sessionStorage.removeItem('size');
          });
          break;
        case "suspenders":
          const h = "Τιράντα";
          sessionStorage.setItem('id', h);
          this.productService.getProductsByCategory(h, this.pageNumber, this.pageSize).subscribe(res => {
            this.product = res.result;
            this.tempProduct = res.result;
            this.category = false;
            sessionStorage.removeItem('size');
            sessionStorage.removeItem('order');
          });
          break;
        default:
          break;
      }

    });

  }

  // @HostListener("window:scroll", ["$event"])
  // onWindowScroll() {
  //   const y = window.pageYOffset.toString();
  //   sessionStorage.setItem('scroll', y);
  // }

  sortByItems(item) {
    this.pageSize = item - 16;
    this.loadMore();
  }

  ngOnDestroy() {
  }

  searchSleeve(value) {
    sessionStorage.setItem('value', value);
    this.product = this.tempProduct;
    if (value !== 'all') {
      this.product = this.product.filter(x => x.sleeve === value);
    }
    this.sortBy(sessionStorage.getItem('order'));
    this.sortBySize(sessionStorage.getItem('size'));
  }

  loadMore() {
    this.pageSize = this.pageSize + 16;
    sessionStorage.setItem('page', this.pageSize.toString());
    const id = sessionStorage.getItem('id');
    const size = sessionStorage.getItem('size');
    const order = sessionStorage.getItem('order');
    const value = sessionStorage.getItem('value');
    if ((id === "Slim-Fit") || (id === "Regular-Fit")) {
      this.productService.getProductsByLine(id, this.pageNumber, this.pageSize).subscribe(res => {
        this.tempProduct = res.result;
        this.product = res.result;
        this.sortBySize(size);
        this.sortBy(order);
        if (sessionStorage.getItem('value')) {
          this.searchSleeve(value);
        }
      });
    } else {
      this.productService.getProductsByCategory(id, this.pageNumber, this.pageSize).subscribe(res => {
        this.tempProduct = res.result;
        this.product = res.result;
        this.sortBySize(size);
        this.sortBy(order);
      });
    }
  }

  sortBy(order) {
    sessionStorage.setItem('order', order);
    switch (order) {
      case "Oldest > Newest":
        this.product = this.product.sort((a, b) => a.created > b.created ? 1 : -1);
        break;
      case "Newest > Oldest":
        this.product = this.product.sort((a, b) => a.created < b.created ? 1 : -1);
        break;
      case "Τιμή (Χαμηλή > Υψηλή)":
        this.product = this.product.sort((a, b) => a.totalCost > b.totalCost ? 1 : -1);
        break;
      case "Τιμή (Υψηλή > Χαμηλή)":
        this.product = this.product.sort((a, b) => a.totalCost < b.totalCost ? 1 : -1);
        break;
      case 'ΤΑΞΙΝΟΜΗΣΗ':
        this.product = this.tempProduct;
        this.product = this.product.sort((a, b) => a < b ? 1 : -1);
        break;
    }
  }

  sortBySize(size) {
    sessionStorage.setItem('size', size);
    switch (size) {
      case "Small":
        this.product = this.tempProduct;
        this.product = this.product.filter(y => y.productSizes.find(p => p.size.title === size));
        break;
      case "Medium":
        this.product = this.tempProduct;
        this.product = this.product.filter(y => y.productSizes.find(p => p.size.title === size));
        break;
      case "Large":
        this.product = this.tempProduct;
        this.product = this.product.filter(y => y.productSizes.find(p => p.size.title === size));
        break;
      case "XLarge":
        this.product = this.tempProduct;
        this.product = this.product.filter(y => y.productSizes.find(p => p.size.title === size));
        break;
      case "XXLarge":
        this.product = this.tempProduct;
        this.product = this.product.filter(y => y.productSizes.find(p => p.size.title === size));
        break;
      case "3XLarge":
        this.product = this.tempProduct;
        this.product = this.product.filter(y => y.productSizes.find(p => p.size.title === size));
        break;
      case "4XLarge":
        this.product = this.tempProduct;
        this.product = this.product.filter(y => y.productSizes.find(p => p.size.title === size));
        break;
      case "5XLarge":
        this.product = this.tempProduct;
        this.product = this.product.filter(y => y.productSizes.find(p => p.size.title === size));
        break;
      case "6XLarge":
        this.product = this.tempProduct;
        this.product = this.product.filter(y => y.productSizes.find(p => p.size.title === size));
        break;
      case "110cm":
        this.product = this.tempProduct;
        this.product = this.product.filter(y => y.productSizes.find(p => p.size.title === size));
        break;
      case "115cm":
        this.product = this.tempProduct;
        this.product = this.product.filter(y => y.productSizes.find(p => p.size.title === size));
        break;
      case "120cm":
        this.product = this.tempProduct;
        this.product = this.product.filter(y => y.productSizes.find(p => p.size.title === size));
        break;
      case "125cm":
        this.product = this.tempProduct;
        this.product = this.product.filter(y => y.productSizes.find(p => p.size.title === size));
        break;
      case "130cm":
        this.product = this.tempProduct;
        this.product = this.product.filter(y => y.productSizes.find(p => p.size.title === size));
        break;
      case "135cm":
        this.product = this.tempProduct;
        this.product = this.product.filter(y => y.productSizes.find(p => p.size.title === size));
        break;
      case "ΜΕΓΕΘΟΣ":
        this.product = this.tempProduct;
        break;
    }
    this.sortBy(sessionStorage.getItem('order'));
  }

  hideBox() {
    this.box = false;
    this.list = true;
  }

  hideList() {
    this.list = false;
    this.box = true;
  }
}
