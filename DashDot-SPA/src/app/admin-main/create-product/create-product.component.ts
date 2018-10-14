import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../../_models/product';
import { ProductService } from '../../_services/product.service';
import { ToastrService } from 'ngx-toastr';
import { RouteConfigLoadStart, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {

  product = new Product();

  constructor(private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  saveProduct() {
    this.productService.addProduct(this.product).subscribe(res => {
      this.productService.currentProduct = res;
      this.router.navigate(['/admin/edit/' + res.id]);
      this.toastr.success('Η καταχώρηση έγινε επιτυχώς');
    }, error => {
      this.toastr.error('kati phge strava')
    });
  }

}
