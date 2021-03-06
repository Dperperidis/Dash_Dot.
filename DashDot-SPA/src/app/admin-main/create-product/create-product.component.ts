import { Component, OnInit, ViewChild, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product, ProductSize, Size, ProductSizeColor, Color } from '../../_models/product';
import { ProductService } from '../../_services/product.service';
import { ToastrService } from 'ngx-toastr';
import { RouteConfigLoadStart, Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ProdSettingsService } from 'src/app/_services/prodsettings.service';
import { AdminProductService } from 'src/app/_services/adminproduct.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Material } from 'src/app/_models/material';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  product = new Product();
  sizes = new Array<Size>();
  colors = new Array<Color>();
  productSize: ProductSize;
  productSizeColor: ProductSizeColor;
  tempColor: any[];
  materialArray: Material[];

  modalRef: BsModalRef;

  constructor(private adminProdService: AdminProductService,
    private toastr: ToastrService,
    private router: Router,
    private prodSettings: ProdSettingsService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem('tempProduct')) {
      let tempProduct = JSON.parse(sessionStorage.getItem('tempProduct'));
      this.product.active = tempProduct.active;
      this.product.title = tempProduct.title;
      this.product.category = tempProduct.category;
      this.product.code = tempProduct.code;
      this.product.sleeve = tempProduct.sleeve;
      this.product.description = tempProduct.description;
      this.product.design = tempProduct.design;
      this.product.discount = tempProduct.discount;
      this.product.line = tempProduct.line;
      this.product.material = tempProduct.material;
      this.product.price = tempProduct.price;
      this.product.season = tempProduct.season;
      this.product.seoUrl = tempProduct.seoUrl;
      sessionStorage.removeItem('tempProduct');
    } else {
      this.product = new Product();
    }
    this.prodSettings.getColors().subscribe(res => {
      this.colors = res;
    });
    this.prodSettings.getSizes().subscribe(res => {
      this.sizes = res;
    });
    this.prodSettings.getMaterial().subscribe(res => {
      this.materialArray = res;
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.productSize = new ProductSize();
    this.productSizeColor = new ProductSizeColor();
  }

  saveProduct() {
    this.spinner.show();
    this.adminProdService.addProduct(this.product).subscribe(res => {
      this.spinner.hide();
      this.adminProdService.currentProduct = res;
      this.router.navigate(['/admin/main/edit/' + res.id]);
      this.toastr.success('Η καταχώρηση έγινε επιτυχώς');
    }, error => {
      this.toastr.error('Υπάρχει ήδη προϊόν με αυτόν τον κωδικό! ');
    });
  }

  addColor() {
    this.productSizeColor.color = this.colors.find(x => x.id == this.productSizeColor.colorId);
    this.productSize.productSizeColor.push(this.productSizeColor);
    this.productSizeColor = new ProductSizeColor();
  }

  addSize() {
    this.productSize.size = this.sizes.find(x => x.id == this.productSize.sizeId);
    this.product.productSizes.push(this.productSize);
    this.modalRef.hide();
  }

  editSize(s: ProductSize, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.productSize = s;
  }

  deleteEntity(id) {
    const index = this.productSize.productSizeColor.findIndex(x => x.colorId == id);
    this.productSize.productSizeColor.splice(index, 1);
  }

  deleteCurSize(x) {
    this.product.productSizes.splice(x, 1);
  }

}
