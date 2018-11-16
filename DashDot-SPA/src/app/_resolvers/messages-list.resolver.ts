import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Message } from "../_models/message";
import { Observable, of } from "rxjs";
import { AdminProductService } from "../_services/adminproduct.service";
import { catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class MessageListResolver implements Resolve<Message[]>{
    pageNumber = 1;
    pageSize = 10;


    constructor(private adminService: AdminProductService,
        private router: Router,
        private toastr: ToastrService){}

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.adminService.getMessages(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.toastr.error("Problem retrieving data");
                this.router.navigate(["/home"]);
                return of(null);
            })
        );
    }
}





