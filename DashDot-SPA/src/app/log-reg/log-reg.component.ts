import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-log-reg',
  templateUrl: './log-reg.component.html',
  styleUrls: ['./log-reg.component.css']
})
export class LogRegComponent implements OnInit {
  user: User;
  registerForm: FormGroup;
  customer: any = {}

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      firstname: ["", Validators.required],
      email: ["", Validators.required],
      lastname: ["", [
        Validators.required,
      ]
      ],
      password: ["", [
        Validators.required,
      ]
      ],
      confirmPassword: ["", Validators.required],
      isAdmin: [false]
    },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get("password").value === g.get("confirmPassword").value ? null : { mismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(res => {
        this.toastr.success("Ο χρήστης δημιουργήθηκε");
        this.router.navigate(['/']);

      }, error => {
        this.toastr.error(error);
        console.log(error);
      }, () => {
        this.authService.login(this.user).subscribe(next => {
          this.router.navigate(['/']);
        })
      })
    }
  }

  loginCustomer() {
    this.authService.login(this.customer).subscribe(res => {
      if (this.authService.decodedToken.isAdmin == 'True') {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.authService.decodedToken = null;
        this.authService.currentUser = null;
        this.toastr.info('Για διαχείριση site κάνε Log In εδώ');
        this.router.navigate(['/admin']);
        return null;
      }
      this.toastr.success("Καλωσήρθες");
      this.router.navigate(["/"]);
    }, error => {
      this.toastr.error("Email/Κωδικός δεν ταιριάζουν");
    });
  }

}
