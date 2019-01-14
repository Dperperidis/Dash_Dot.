import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from '../_models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-log-reg',
  templateUrl: './log-reg.component.html',
  styleUrls: ['./log-reg.component.css']
})
export class LogRegComponent implements OnInit {
  modalRef: BsModalRef;
  user: User;
  registerForm: FormGroup;
  customer: any = {};
  signIn = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private cart: ShoppingCartService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.createRegisterForm();
    if (this.authService.decodedToken == null) {
      return;
    } else {
      this.router.navigate(['/']);
      this.toastr.warning('Είσαι ήδη συνδεδεμένος/η');
    }
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
      confirmPassword: ["", Validators.required]
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
      }, () => {
        this.authService.login(this.user).subscribe(next => {
          this.cart.getCartOnDemand();
          this.router.navigate(['/']);
        });
      });
    }
  }

  openModal(template: TemplateRef<any>) {
    setTimeout(() => {
      this.modalRef = this.modalService.show(template);
    },1500)
  }

  setSignIn() {
    this.signIn = false;
  }



  loginCustomer() {
    this.authService.login(this.customer).subscribe(res => {
      if (this.authService.decodedToken.isAdmin === 'True') {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.authService.decodedToken = null;
        this.authService.currentUser = null;
        this.toastr.info('Για διαχείριση site κάνε Log In εδώ');
        this.router.navigate(['/admin']);
        return null;
      }
      this.cart.getCartOnDemand();
      this.router.navigate(["/"]);
    }, error => {
      this.signIn = true;
    });
  }




}
