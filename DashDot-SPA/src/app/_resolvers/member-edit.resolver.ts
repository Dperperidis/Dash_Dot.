import { Injectable } from "@angular/core";
import { User } from "../_models/user";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../_services/auth.service";
import { UserService } from "../_services/user.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(this.authService.decodedToken.Id).pipe(
      catchError(error => {
        this.toastr.error("Problem retrieving your data");
        this.router.navigate(["/"]);
        return of(null);
      })
    );
  }
}
