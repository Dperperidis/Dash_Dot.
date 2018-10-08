import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../_models/product';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {
  photoUrl: string;
  show = false;
  

  constructor(private productService: ProductService) { }

  ngOnInit() {

  }

  productShow() {
    this.productService.productShow();
  }
  editProductShow() {
    this.productService.editProductShow();
  }
}
