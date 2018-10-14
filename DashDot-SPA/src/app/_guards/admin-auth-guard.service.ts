import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../_services/auth.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AdminAuthGuard implements CanActivate {

    constructor(private authService: AuthService,
        private toastr: ToastrService,
        private router: Router) { }

    canActivate(): boolean {
        if (this.authService.isAdmin) {
            return true;
        } else {
            this.toastr.error("Δεν έχετε δικαιώματα για να εισέλθετε");
            this.router.navigate(["/"]);
            return false;
        }
    }
}