import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product, Size } from '../_models/product';
import { ActivatedRoute, Params } from '@angular/router';
import { SortByService } from '../_services/sortbyservice';



@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  box = true;
  list = false;
  product = new Array<Product>();
  tempProduct: any[] = [];
  tempSize: any = {};

  constructor(private sortByService: SortByService, private route: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      const id = param['id']
      switch (id) {
        case "slim-fit":
          const x = "Slim-Fit"
          this.productService.getProductsByLine(x).subscribe(res => {
            this.product = res;
          })
          break;
        case "regular-fit":
          const y = "Regular-Fit"
          this.productService.getProductsByLine(y).subscribe(res => {
            this.product = res;
          })
          break;
        case "cardigans":
          const a = "Ζακέτα"
          this.productService.getProductsByCategory(a).subscribe(res => {
            this.product = res;
          })
          break;
        case "sweaters":
          const b = "Πουλόβερ"
          this.productService.getProductsByCategory(b).subscribe(res => {
            this.product = res;
          })
          break;
        case "sweater-Vests":
          const c = "Καζάκα"
          this.productService.getProductsByCategory(c).subscribe(res => {
            this.product = res;
          })
          break;
        case "vests":
          const d = "Γιλέκο"
          this.productService.getProductsByCategory(d).subscribe(res => {
            this.product = res;
          })
          break;
        case "ties":
          const e = "Γραβάτα"
          this.productService.getProductsByCategory(e).subscribe(res => {
            this.product = res;
          })
          break;
        case "bow-tie":
          const f = "Παπιγιόν"
          this.productService.getProductsByCategory(f).subscribe(res => {
            this.product = res;
          })
          break;
        case "cuff-links":
          const g = "Μανικετόκουμπα"
          this.productService.getProductsByCategory(g).subscribe(res => {
            this.product = res;
          })
          break;
        case "beanies":
          const i = "Σκουφάκι"
          this.productService.getProductsByCategory(i).subscribe(res => {
            this.product = res;
          })
          break;
        case "scarfs":
          const j = "Φουλάρι"
          this.productService.getProductsByCategory(j).subscribe(res => {
            this.product = res;
          })
          break;
        case "belts":
          const k = "Ζώνη"
          this.productService.getProductsByCategory(k).subscribe(res => {
            this.product = res;
          })
          break;
        case "suspenders":
          const h = "Τιράντα"
          this.productService.getProductsByCategory(h).subscribe(res => {
            this.product = res;
          })
        default:
          break;
      }
    });
  }

  sortBy(order) {
    switch (order) {
      case "Oldest > Newest":

        this.product = this.product.sort((a, b) => a > b ? 1 : -1);
        break;
      case "Newest > Oldest":
        this.product = this.product.sort((a, b) => a > b ? 1 : -1);
        break;
      case "Τιμή (Χαμηλή > Υψηλή)":
        this.product = this.product.sort((a, b) => a.totalCost > b.totalCost ? 1 : -1);
        break;
      case "Τιμή (Υψηλή > Χαμηλή)":
        this.product = this.product.sort((a, b) => a.totalCost < b.totalCost ? 1 : -1);
        break;
      case "":
        this.product = this.product.sort((a, b) => a > b ? 1 : -1);
        break;
    }
  }

  sortBySize(size) {
    switch (size) {
      case "Small":
        this.product.forEach(item => {
          item.productSizes.forEach(element => {
             this.tempSize.title = element.size.title;
          })
          this.product = this.product.filter(y => y.productSizes.find(p => p.size.title == this.tempSize.title));
          console.log(this.product)
        })


        break;
      case "Medium":
        this.product = this.product.filter(y => y.productSizes[1].size.title == size);
        console.log(this.product)
        break;
      case "Large":

        this.product = this.product.filter(y => y.productSizes[0].size.title == size);
        break;
      case "XLarge":

        this.product = this.product.filter(y => y.productSizes[0].size.title == size);
        break;
      case "XXLarge":

        this.product = this.product.filter(x => x.productSizes.filter(y => y.size) == size);
        console.log(this.product)
        break;
      case "3XLarge":

        this.product = this.product.filter(x => x.productSizes.filter(y => y.size) == size);
        console.log(this.product)
        break;
      case "4XLarge":

        this.product = this.product.filter(x => x.productSizes.filter(y => y.size) == size);
        console.log(this.product)
        break;
      case "5XLarge":

        this.product = this.product.filter(x => x.productSizes.filter(y => y.size) == size);
        console.log(this.product)
        break;
      case "6XLarge":

        this.product = this.product.filter(x => x.productSizes.filter(y => y.size) == size);
        console.log(this.product)
        break;
    }
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