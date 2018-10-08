import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../../_models/photo';
import { ProductService } from '../../_services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../_models/product';
import { ProductToDisplay } from '../../_models/productToDisplay';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  product = {};

  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  getProduct(id: number) {
    this.productService.getProductById(id).subscribe(res => {
      this.product = res;
      this.toastr.success('ok')
    }, error => {
      this.toastr.error('error')
    })
  }

}
