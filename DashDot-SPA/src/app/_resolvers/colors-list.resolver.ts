import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, Resolve } from "@angular/router";
import {  Color } from "../_models/product";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { AdminProductService } from "../_services/adminproduct.service";
import { ProdSettingsService } from "../_services/prodsettings.service";

@Injectable()
export class ColorListResolver implements Resolve<Color[]> {
    pageNumber = 1;
    pageSize = 10;

    constructor(
        private router: Router,
        private prodSettings: ProdSettingsService,
        private toastr: ToastrService
    ) {  }
    resolve(route: ActivatedRouteSnapshot): Observable<Color[]> {
        return this.prodSettings.getColorsForAdmin(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.toastr.error("Problem retrieving data");
                this.router.navigate(["/"]);
                return of(null);
            })
        );
    }
}