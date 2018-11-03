import { Product } from "../_models/product";
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { ProductService } from "../_services/product.service";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
@Injectable()
export class GetProductResolver implements Resolve<Product> {


    constructor(
        private productService: ProductService,
        private router: Router,
        private toastr: ToastrService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Product> {
        return this.productService.getProductBySeoUrl(route.params["id"]).pipe(
            catchError(error => {
                this.toastr.error("Προβλημα");
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}