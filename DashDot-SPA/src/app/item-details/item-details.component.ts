import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Product, Size, Color, ProductSize, ProductSizeColor } from '../_models/product';

import { ProdSettingsService } from '../_services/prodsettings.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  product = new Product();
  sizes = new Array<any>();
  color: Color;
  productSize = new Array<ProductSize>();
  productSizeColor = new Array<Color>();

  constructor(private prodSettings: ProdSettingsService,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.product = data["product"];
    });
    this.sizes = this.product.productSizes;


  }

  onChange(deviceValue: number) {
    if (deviceValue == 0){
     this.productSize = new Array<ProductSize>();
     return;
    }
    this.prodSettings.getColorsBySize(deviceValue).subscribe(res => {
      this.productSize = res;
      console.log(res);
    });
    console.log(deviceValue)
  }
}

