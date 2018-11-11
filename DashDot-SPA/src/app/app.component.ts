import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  jwtHelper = new JwtHelperService();


  constructor(private authService: AuthService,
  ) {

  }

  ngOnInit() {
    const token = localStorage.getItem("token");
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      this.authService.isAdmin =
        this.authService.decodedToken.isAdmin === "True";
    }
    else {
      const token = sessionStorage.getItem("token")
      if (token) {
        this.authService.decodedToken = this.jwtHelper.decodeToken(token);
        this.authService.isAdmin =
          this.authService.decodedToken.isAdmin === "True";
      }

    }
  }
}
