import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../_services/auth.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Product } from "../_models/product";
import { ProductService } from "../_services/product.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  private subscriptions = new Array<Subscription>();
  isAdmin = false;
  public isCollapsed = false;
  product = new Array<Product>();

  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private productService: ProductService) { }

  ngOnInit() {
    this.subscriptions.push(this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    }));
    this.productService.getProducts().subscribe(res => {
      this.product = res;
    })

  }

  loggedIn() {
    return this.authService.loggedIn();
  }


  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.toastr.success("Logout Success");
    this.router.navigate(['/']);
  }
}
