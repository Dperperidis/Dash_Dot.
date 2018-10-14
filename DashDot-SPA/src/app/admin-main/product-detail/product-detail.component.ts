import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Routing } from 'src/app/_services/routing.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Output() sendCodeId = new EventEmitter<string>();
  product = new Product();
  productList: any[] = [];


  constructor(private productService: ProductService, private router: Router,
    private routing: Routing,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  searchProduct() {
    this.routing.prodSearch().subscribe(res => {
      this.productList = res;
    })
  }

  searchProductByCode(code) {
    this.productService.getProductByCode(code).subscribe(res => {
      this.productService.currentProduct = res;
      this.router.navigate(['/admin/edit/' + res.id]);
    },error =>{
      this.toastr.error(error);
    })
  }
}
