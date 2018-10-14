import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  admin: any = {}

  constructor(private authService: AuthService, private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    if (this.authService.isAdmin) {
      this.router.navigate(['/admin/main']);
    }
  }


  loginCustomer() {
    this.authService.login(this.admin).subscribe(res => {
      if (this.authService.decodedToken.isAdmin == 'True') {
        this.toastr.success("Καλωσήρθες");
        this.router.navigate(["/admin/main"]);
      } else {
        this.toastr.warning("Δεν έχετε πρόσβαση")
      }

    }, error => {
      this.toastr.error("Email/Κωδικός δεν ταιριάζουν");
    });
  }

}
