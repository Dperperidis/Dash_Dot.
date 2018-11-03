import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { ProductService } from '../_services/product.service';
import { Product } from '../_models/product';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  product: Product[];

  constructor(private authService: AuthService, private productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      const id = param['id']
      
      switch (id) {
        case "Slim-Fit":
          this.productService.getProductsByLine(id).subscribe(res => {
            this.product = res;
            console.log(res)
          })
          break;
          case "Regular-Fit":
          this.productService.getProductsByLine(id).subscribe(res => {
            this.product = res;
          })
          break;
          case "Cardigans":
            const a = "Ζακέτα"
          this.productService.getProductsByCategory(a).subscribe(res => {
            this.product = res;
          })
          case "Sweaters":
          const b = "Πουλόβερ"
          this.productService.getProductsByCategory(b).subscribe(res => {
            this.product = res;
          })
          case "Sweater Vests":
            const c = "Καζάκα"
          this.productService.getProductsByCategory(c).subscribe(res => {
            this.product = res;
          })
          case "Vests":
          const d = "Γιλέκο"
          this.productService.getProductsByCategory(d).subscribe(res => {
            this.product = res;
          })
          case "Ties":
          const i = "Γραβάτα"
          console.log(i);
          this.productService.getProductsByCategory(i).subscribe(res => {
            this.product = res;
          })
        default:
          break;
      }
    });
  }

  getProds() {
    this.productService.getProducts().subscribe(res => {
      this.product = res;
    })
  }
} 