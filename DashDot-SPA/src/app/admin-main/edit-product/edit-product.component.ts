import { Component, OnInit, ViewChild, Input, HostListener, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/_services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Product, Size, Color, ProductSize, ProductSizeColor } from 'src/app/_models/product';

import { AdminProductService } from 'src/app/_services/adminproduct.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ProdSettingsService } from 'src/app/_services/prodsettings.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Material } from 'src/app/_models/material';

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
  materialArray: Material[];
  photoUrl: string;
  sizes = new Array<Size>();
  colors = new Array<Color>();
  productSize: ProductSize;
  productSizeColor = new ProductSizeColor();
  disable = false;
  modalRef: BsModalRef;

  constructor(
    private adminProdService: AdminProductService,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private prodSettings: ProdSettingsService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.productService.currentProduct = data["product"];
      this.product = this.productService.currentProduct;
    });
    this.prodSettings.getColors().subscribe(res => {
      this.colors = res;
      this.product.productSizes.sort((a, b) => a.sizeId > b.sizeId ? 1 : -1);
    });
    this.prodSettings.getSizes().subscribe(res => {
      this.sizes = res;
    });
    this.prodSettings.getMaterial().subscribe(res=>{
      this.materialArray = res;
    })
  }

  updateMainPhoto(photoUrl) {
    this.product.photoUrl = photoUrl;
  }

  updateProduct() {
    this.spinner.show();
    this.adminProdService.updateProduct(this.product).subscribe(res => {
      this.toastr.success("Η καταχώρηση έγινε επιτυχώς");
      this.editForm.reset(this.product);
      window.location.reload();
      this.spinner.hide();
    }, error => {
      this.toastr.error(error);
    });
  }

  deleteProduct(id) {
    if (window.confirm("Είστε σίγουρος/η οτι θέλετε να διαγράψετε το προϊόν;")) {
      this.adminProdService.deleteProduct(id).subscribe(res => {
        this.toastr.success("Η διαγραφή έγινε επιτυχώς");
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
    this.productSize.size = this.sizes.find(x => x.id == this.productSize.sizeId);
    this.product.productSizes.push(this.productSize);
    this.modalRef.hide();

  }

  editSize(s: ProductSize, template: TemplateRef<any>) {
    this.disable = false;
    this.modalRef = this.modalService.show(template);
    this.productSize = s;

  }

  deleteEntity(id) {
    const index = this.productSize.productSizeColor.findIndex(x => x.colorId == id);
    this.productSize.productSizeColor.splice(index, 1);
  }

  deleteCurSize(id) {

    const i = this.product.productSizes.findIndex(x => x.id == id);
    this.product.productSizes.splice(i, 1);

  }

  deleteSize(id) {
    this.adminProdService.deleteSize(id).subscribe(res => {
      const i = this.product.productSizes.findIndex(x => x.id == id);
      this.product.productSizes.splice(i, 1);
      this.toastr.warning('Η διαγραφή έγινε επιτυχώς');
    }, error => {
      this.toastr.error('Το προϊον δεν είναι αποθηκευμένο για να διαγραφτεί');
    });

  }


  deleteColor(id) {
    this.prodSettings.deleteProdColor(id).subscribe(res => {
      const index = this.productSize.productSizeColor.findIndex(x => x.id == id);
      this.productSize.productSizeColor.splice(index, 1);
      this.toastr.success('Η διαγραφή έγινε επιτυχώς');
    }, error => {
      this.toastr.error('Διπλό κλικ για διαγραφή χρώματος σε μέγεθος που δεν είναι αποθηκευμένο.');
    });
  }


}
