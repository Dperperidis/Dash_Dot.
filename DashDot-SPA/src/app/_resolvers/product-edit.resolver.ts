import { Injectable } from "@angular/core";
import { ProductService } from "../_services/product.service";
import { Router, ActivatedRouteSnapshot } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AdminProductService } from "../_services/adminproduct.service";

@Injectable()
export class ProductEditResolver<Product> {
    constructor(
        private adminProdService: AdminProductService,
        private productService: ProductService,
        private router: Router,
        private toastr: ToastrService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Product> {
        return this.productService.getProductById(this.adminProdService.currentProduct.id).pipe(
            catchError(error => {
                this.toastr.error("provlhma");
                this.router.navigate(['/admin/main']);
                return of(null);
            })
        );
    }
}