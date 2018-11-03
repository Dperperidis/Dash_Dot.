import { Component, OnInit, TemplateRef} from '@angular/core';
import { Product } from 'src/app/_models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { ToastrService } from 'ngx-toastr';
import { AdminProductService } from 'src/app/_services/adminproduct.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product = new Array<Product>();
  productList: any[] = [];


  constructor(private productService: ProductService,
    private adminProdService: AdminProductService,
     private router: Router,
    private toastr: ToastrService,

  ) { }

  ngOnInit() {
  }

  searchProduct(category) {
    this.productService.getProductsByCategory(category).subscribe(res => {
      this.product = res;
    }, error => {
      this.toastr.error('Δεν ήταν εφικτό η εμφάνιση προϊόντων.')
    })
  }


  searchProductByCode(code) {
    this.productService.getProductByCode(code).subscribe(res => {
      this.productService.currentProduct = res;
      if (res == null) {
        this.toastr.error('Δεν βρέθηκε προιόν με αυτόν τον κωδικό.')
      }
      this.router.navigate(['/admin/main/edit/' + res.id]);
    }, error => {
      this.toastr.error("Παρακαλώ εισάγετε κωδικό προϊόντος.");
    })
  }

  deleteProduct(id) {
    if (window.confirm("Είστε σίγουρος/η οτι θέλετε να διαγράψετε το προϊόν;")) {
      const i = this.product.findIndex(x => x.id === id);
      this.adminProdService.deleteProduct(id).subscribe(res => {
        this.product.splice(i, 1);
        this.toastr.success("Η διαγραφή έγινε επιτυχώς")
        this.router.navigate(['/admin/main/details']);
      }, error => {
        this.toastr.error(error);
      });
    } else {
      return true;
    }
  }
}
