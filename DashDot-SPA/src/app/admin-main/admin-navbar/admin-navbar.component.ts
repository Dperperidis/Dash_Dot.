import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {


  constructor(
    private authService: AuthService, private router: Router,
    private route: ActivatedRoute, private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.toastr.success("Logout Success");
    this.router.navigate(['/admin']);
  }
}
