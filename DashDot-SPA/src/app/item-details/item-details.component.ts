import { Component, OnInit, TemplateRef } from '@angular/core';

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
  productModal = new Product();



  constructor(private prodSettings: ProdSettingsService,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.product = data["product"];
      console.log(this.product)
    });
    this.sizes = this.product.productSizes;
    this.productModal.photoUrl= this.product.photoUrl;
  }

  
  onChange(sizeId: number) {
    if (sizeId == 0) {
      this.productSize = new Array<ProductSize>();
      return;
    }
    this.prodSettings.getColorsBySize(sizeId, this.product.id).subscribe(res => {
      this.productSize = res;
    });
  }

  onImgChange(imgUrl) {
   this.product.photoUrl = imgUrl;
   this.productModal.photoUrl = imgUrl; 
  }
  onImgModalChange(imgUrl){
    this.productModal.photoUrl = imgUrl;
  }

}



