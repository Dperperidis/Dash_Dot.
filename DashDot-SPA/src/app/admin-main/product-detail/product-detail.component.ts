import { Component, OnInit, TemplateRef } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { ToastrService } from 'ngx-toastr';
import { AdminProductService } from 'src/app/_services/adminproduct.service';
import { Pagination, PaginatedResult } from 'src/app/_models/Pagination';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product[];
  editProd = true;
  pagination: Pagination;
  sortBy: string;

  constructor(private productService: ProductService,
    private adminProdService: AdminProductService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,

  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.product = data['product'].result;
      this.pagination = data['product'].pagination;
    });
  }

  searchProduct(category, sortBy?) {
    this.adminProdService.getProductsByCategoryForAdmin(category, sortBy, this.pagination.currentPage,
      this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Product[]>) => {
        this.product = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.toastr.error('Δεν ήταν εφικτό η εμφάνιση προϊόντων.');
      });
    this.pagination.currentPage = 1;
    sessionStorage.setItem('category', category);
  }

  searchProductByCode(code) {
    this.productService.getProductByCode(code).subscribe(res => {
      this.productService.currentProduct = res;
      if (res == null) {
        this.toastr.error('Δεν βρέθηκε προιόν με αυτόν τον κωδικό.');
      }
      this.router.navigate(['/admin/main/edit/' + res.id]);
    }, error => {
      this.toastr.error("Παρακαλώ εισάγετε κωδικό προϊόντος.");
    });
  }

  deleteProduct(id) {
    if (window.confirm("Είστε σίγουρος/η οτι θέλετε να διαγράψετε το προϊόν;")) {
      const i = this.product.findIndex(x => x.id === id);
      this.adminProdService.deleteProduct(id).subscribe(res => {
        this.product.splice(i, 1);
        this.toastr.success("Η διαγραφή έγινε επιτυχώς");
        this.router.navigate(['/admin/main/details']);
      }, error => {
        this.toastr.error(error);
      });
    } else {
      return true;
    }
  }

  edit() {
    this.editProd = false;
  }

  updateProduct(i) {
    this.adminProdService.updateProduct(this.product[i]).subscribe(res => {
      this.toastr.success("Η καταχώρηση έγινε επιτυχώς");
    }, error => {
      this.toastr.error(error);
    });
  }

  copyProduct(i) {
    sessionStorage.setItem('tempProduct', JSON.stringify(this.product[i]));
    this.router.navigate(['/admin/main/create-product']);

  }

  pageChanged(event: any): void {
    const category = sessionStorage.getItem('category');
    this.pagination.currentPage = event.page;
    this.searchProduct(category, this.sortBy);
  }

  sortPrice() {
    const category = sessionStorage.getItem('category');
    this.sortBy = 'totalCost';
    this.searchProduct(category, this.sortBy);
  }

  sortCode() {
    const category = sessionStorage.getItem('category');
    this.sortBy = 'code';
    this.searchProduct(category, this.sortBy);
  }

  sortActive() {
    const category = sessionStorage.getItem('category');
    this.sortBy = 'active';
    this.searchProduct(category, this.sortBy);
  }

  sortDate() {
    const category = sessionStorage.getItem('category');
    this.sortBy = 'created';
    this.searchProduct(category, this.sortBy);
  }

  sortSuggest() {
    const category = sessionStorage.getItem('category');
    this.sortBy = 'suggested';
    this.searchProduct(category, this.sortBy);
  }
}
