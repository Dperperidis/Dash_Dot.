import { Component, OnInit, ViewChild, Input, Output, EventEmitter, HostListener, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/_services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Product, Size, Color, ProductSize, ProductSizeColor } from 'src/app/_models/product';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AdminProductService } from 'src/app/_services/adminproduct.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ProdSettingsService } from 'src/app/_services/prodsettings.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  @ViewChild("editForm") editForm: NgForm;
  @Input() product = new Product();
  @HostListener("window:beforeunload", ["$event"])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  photoUrl: string;
  sizes = new Array<Size>();
  colors = new Array<Color>();
  productSize : ProductSize;
  productSizeColor =  new ProductSizeColor();
  disable: boolean = false;
  modalRef: BsModalRef;

  constructor(
    private adminProdService: AdminProductService,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private prodSettings: ProdSettingsService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.productService.currentProduct = data["product"];
      this.product = this.productService.currentProduct;
      console.log(this.product)
    });
    this.prodSettings.getColors().subscribe(res => {
      this.colors = res;

    })
    this.prodSettings.getSizes().subscribe(res => {
      this.sizes = res;
    })
  }

  updateMainPhoto(photoUrl) {
    this.product.photoUrl = photoUrl;
  }

  updateProduct() {
    this.adminProdService.updateProduct(this.product).subscribe(res => {
      this.toastr.success("Η καταχώρηση έγινε επιτυχώς");
      this.editForm.reset(this.product);
    }, error => {
      this.toastr.error(error);
    })
  }

  deleteProduct(id) {
    if (window.confirm("Είστε σίγουρος/η οτι θέλετε να διαγράψετε το προϊόν;")) {
      this.adminProdService.deleteProduct(id).subscribe(res => {
        this.toastr.success("Η διαγραφή έγινε επιτυχώς")
        this.router.navigate(['/admin/main/details']);
      }, error => {
        this.toastr.error(error);
      });
    } else {
      return true;
    }
  }

  
  openModal(template: TemplateRef<any>) {
    this.disable = true;
    this.modalRef = this.modalService.show(template);
    this.productSize = new ProductSize();
    this.productSizeColor = new ProductSizeColor();
    
  }

  addColor() {
    this.productSizeColor.color = this.colors.find(x => x.id == this.productSizeColor.colorId);
    this.productSize.productSizeColor.push(this.productSizeColor);
    this.productSizeColor = new ProductSizeColor();
  }

  addSize() {
    this.productSize.size = this.sizes.find(x => x.id == this.productSize.sizeId)
    this.product.productSizes.push(this.productSize);
    this.modalRef.hide();

  }

  editSize(s: ProductSize, template: TemplateRef<any>) {
    this.disable = false;
    this.modalRef = this.modalService.show(template);
    this.productSize = s;
    
  }

  deleteEntity(id){
    const index = this.productSize.productSizeColor.findIndex(x=>x.colorId==id);
    this.productSize.productSizeColor.splice(index, 1);
  }


}