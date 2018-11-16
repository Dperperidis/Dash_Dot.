import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { ProductService } from "../_services/product.service";
import { Product } from "../_models/product";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { AdminProductService } from "../_services/adminproduct.service";

@Injectable()
export class ProductListResolver implements Resolve<Product[]> {
    pageNumber = 1;
    pageSize = 2;

    constructor(
        private router: Router,
        private adminService: AdminProductService,
        private toastr: ToastrService
    ) {  }
    resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {
        const category = sessionStorage.getItem('category')
        return this.adminService.getProductsByCategoryForAdmin(category, this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.toastr.error("Problem retrieving data");
                this.router.navigate(["/"]);
                return of(null);
            })
        );
    }
}