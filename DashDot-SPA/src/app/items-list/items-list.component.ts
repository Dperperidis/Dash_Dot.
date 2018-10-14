import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { ProductService } from '../_services/product.service';
import { Product } from '../_models/product';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  private subscriptions = new Array<Subscription>();
  isAdmin = false;
  product: Product[];

  constructor(private authService: AuthService, private productService: ProductService) { }

  ngOnInit() {
    this.subscriptions.push(this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    }));
    this.getProds();
  }

  getProds() {
    this.productService.getProducts().subscribe(res => {
      this.product = res;
    })
  }
} 