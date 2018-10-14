import { Injectable } from "@angular/core";
import { ProductService } from "../_services/product.service";
import { Router, ActivatedRouteSnapshot } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ProductEditResolver<Product> {
    constructor(
        private productService: ProductService,
        private router: Router,
        private toastr: ToastrService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Product> {
        return this.productService.getProductById(this.productService.currentProduct.id).pipe(
            catchError(error => {
                this.toastr.error("provlhma");
                this.router.navigate(['/admin/main']);
                return of(null);
            })
        );
    }
}