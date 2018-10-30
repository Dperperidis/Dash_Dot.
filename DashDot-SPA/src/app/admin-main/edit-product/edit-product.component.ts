import { Component, OnInit, ViewChild, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/_services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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
  baseUrl = environment.apiUrl;

  photoUrl: string;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.productService.currentProduct = data["product"];
      this.product = this.productService.currentProduct;
    });
  }

  updateMainPhoto(photoUrl) {
    this.product.photoUrl = photoUrl;
  }

  updateProduct() {
    this.productService.updateProduct(this.product).subscribe(res => {
      this.toastr.success("Η καταχώρηση έγινε επιτυχώς");
      this.editForm.reset(this.product);
    }, error => {
      this.toastr.error(error);
    })
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe(res => {
      this.toastr.success("Η διαγραφή έγινε επιτυχώς")
      this.router.navigate(['/admin/main/details'])
    }, error => {
      this.toastr.error(error);
    });

  }



}



