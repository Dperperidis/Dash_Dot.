import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const token = localStorage.getItem("token");
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      this.authService.isAdmin =
        this.authService.decodedToken.isAdmin === "True";
    } else {
      const tokenStorage = sessionStorage.getItem("token");
      if (tokenStorage) {
        this.authService.decodedToken = this.jwtHelper.decodeToken(tokenStorage);
        this.authService.isAdmin =
          this.authService.decodedToken.isAdmin === "True";
      }

    }
    
    // console.log(this.jwtHelper.decodeToken(localStorage.getItem('token'))); 
    // if (this.authService.decodedToken === ''||null){
    //   localStorage.removeItem('token');
    //   sessionStorage.removeItem('token');
    // }
  }
}
