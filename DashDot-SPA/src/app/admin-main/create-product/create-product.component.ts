import { Component, OnInit, ViewChild, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product, ProductSize, Size, ProductSizeColor, Color } from '../../_models/product';
import { ProductService } from '../../_services/product.service';
import { ToastrService } from 'ngx-toastr';
import { RouteConfigLoadStart, Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ProdSettingsService } from 'src/app/_services/prodsettings.service';
import { AdminProductService } from 'src/app/_services/adminproduct.service';

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
  colorSizeTitle: string;



  modalRef: BsModalRef;

  constructor(private adminProdService: AdminProductService,
    private toastr: ToastrService,
    private router: Router,
    private prodSettings: ProdSettingsService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.prodSettings.getColors().subscribe(res => {
      this.colors = res;
    })
    this.prodSettings.getSizes().subscribe(res => {
      this.sizes = res;
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.productSize = new ProductSize();
    this.productSizeColor = new ProductSizeColor();
  }

  saveProduct() {
    console.log(this.product)
    this.adminProdService.addProduct(this.product).subscribe(res => {
      this.adminProdService.currentProduct = res;
      this.router.navigate(['/admin/main/edit/' + res.id]);
      this.toastr.success('Η καταχώρηση έγινε επιτυχώς');
    }, error => {
      this.toastr.error('Υπάρχει ήδη προιον με αυτον τον κωδικό')
    });
  }

  addColor() {
    this.productSizeColor.color = this.colors.find(x => x.id == this.productSizeColor.colorId);
    this.productSize.productSizeColor.push(this.productSizeColor);
    console.log(this.productSizeColor)
    this.productSizeColor = new ProductSizeColor();
  }

  addSize() {
    this.productSize.size = this.sizes.find(x => x.id == this.productSize.sizeId)
    this.product.productSizes.push(this.productSize);
    this.modalRef.hide();

  }

  editSize(s: ProductSize, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.productSize = s;
  }

  deleteEntity(id){
    const index = this.productSize.productSizeColor.findIndex(x=>x.colorId==id);
    this.productSize.productSizeColor.splice(index, 1);
  }


  passValue(value){
console.log(value);
  }
}
