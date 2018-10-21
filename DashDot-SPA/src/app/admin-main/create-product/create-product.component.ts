import { Component, OnInit, ViewChild, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product, ProductSize, Size, ProductSizeColor, Color } from '../../_models/product';
import { ProductService } from '../../_services/product.service';
import { ToastrService } from 'ngx-toastr';
import { RouteConfigLoadStart, Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ProdSettingsService } from 'src/app/_services/prodsettings.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  product = new Product();
  size: Size;
  color: Color;
  productSize: Array<ProductSize>;
  productSizeColor: ProductSizeColor;



  modalRef: BsModalRef;

  constructor(private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private prodSettings: ProdSettingsService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  this.prodSettings.getColors().subscribe(res=>{
    this.color = res;
  })
  this.prodSettings.getSizes().subscribe(res=>{
    this.size =res;
  })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  saveProduct() {
    console.log(this.product)
    this.productService.addProduct(this.product).subscribe(res => {
      this.productService.currentProduct = res;
      this.router.navigate(['/admin/main/edit/' + res.id]);
      this.toastr.success('Η καταχώρηση έγινε επιτυχώς');
    }, error => {
      this.toastr.error('Υπάρχει ήδη προιον με αυτον τον κωδικό')
    });
  }


}
