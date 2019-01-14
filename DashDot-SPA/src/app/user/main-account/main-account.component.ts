import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/User';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-main-account',
  templateUrl: './main-account.component.html',
  styleUrls: ['./main-account.component.css']
})
export class MainAccountComponent implements OnInit {
  user: User;
  save = false;
  saveError = false


  constructor(private route: ActivatedRoute,
    private toastrService: ToastrService, private router: Router,
    private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data["user"];
    });
    if ((!sessionStorage.getItem('token')) && (!localStorage.getItem('token'))) {
      this.toastrService.warning('Δεν είσαι συνδεδεμένος!');
      this.router.navigate(['/']);
    } else {
      this.route.data.subscribe(data => {
        this.user = data["user"];
      }, error => {
        this.router.navigate(['/']);
      });
    }
  }

  updateUser(user) {
    user.id = this.user.id;
    this.userService.updateUser(user).subscribe(res => {
      this.save = true;
    }, error => {
      this.saveError = true;
    });
  }


}
