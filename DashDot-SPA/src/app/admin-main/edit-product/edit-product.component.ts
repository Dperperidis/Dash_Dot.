import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/_services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { Location } from '@angular/common';
import { Routing } from 'src/app/_services/routing.service';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  @ViewChild("editForm") editForm: NgForm;
  @Input() product = new Product();



  photoUrl: string;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private routing: Routing,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.productService.currentProduct = data["product"];
      this.product = this.productService.currentProduct;
    });
  }
  // prodCode(code) {
  //   this.productService.getProductById(code).subscribe(res => {
  //     this.product = res;
  //   })
  // }

  updateMainPhoto(photoUrl) {
    this.product.photoUrl = photoUrl;
  }


  backClicked() {
    this.routing.findProduct();
    this.router.navigate(['/admin/main']);


  }
}

