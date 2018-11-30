import { Component, OnInit, OnDestroy, HostListener, Inject } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../_services/auth.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ShoppingCartService } from "../_services/shopping-cart.service";
import { CartItem } from "../_models/shoppingcart";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private subscriptions = new Array<Subscription>();
  isAdmin = false;
  public isCollapsed = false;
  cart = new Array<CartItem>();
  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private cartService: ShoppingCartService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.cartService.cart$.subscribe(value => {
      this.cart = value;
    }));
    this.subscriptions.push(this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    }));
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
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.toastr.success("Logout Success");
    this.router.navigate(['/']);
  }
}
