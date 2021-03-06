import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { User } from "../_models/User";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    baseUrl = environment.apiUrl;
    user: User;
    jwtHelper = new JwtHelperService();
    decodedToken: any;
    currentUser: User;

    constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
        this.init();
    }

    private isAdminInSubject$ = new BehaviorSubject<boolean>(false);
    isAdmin$ = this.isAdminInSubject$.asObservable();

    get isAdmin(): boolean { return this.isAdminInSubject$.getValue(); }
    set isAdmin(value: boolean) { this.isAdminInSubject$.next(value); }

    init() {
        if (this.loggedIn()) {
            return;
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            this.decodedToken = null;
            this.currentUser = null;
        }

        // const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        // if (this.jwtHelper.isTokenExpired(token)) {
        //     console.log(token)
        //     localStorage.removeItem("token");
        //     localStorage.removeItem("user");
        //     sessionStorage.removeItem("token");
        //     sessionStorage.removeItem("user");
        //     this.decodedToken = null;
        //     this.currentUser = null;
        //     this.router.navigate(['/']);
        // } 
    }
    register(user: User) {
        return this.http.post(this.baseUrl + "auth/register", user);
    }
    login(customer: any) {
        return this.http.post(this.baseUrl + "auth/login", customer).pipe(
            map((response: any) => {
                const user = response;
                if (user) {
                    if (customer.saveUser === true) {
                        localStorage.setItem("token", user.token);
                        localStorage.setItem("user", JSON.stringify(user.user));
                        this.decodedToken = this.jwtHelper.decodeToken(user.token);
                        this.isAdmin = this.decodedToken.isAdmin === 'True';
                        this.currentUser = user.user;

                    } else {
                        sessionStorage.setItem("token", user.token);
                        sessionStorage.setItem("user", JSON.stringify(user.user));
                        this.decodedToken = this.jwtHelper.decodeToken(user.token);
                        this.isAdmin = this.decodedToken.isAdmin === 'True';
                        this.currentUser = user.user;
                    }
                }
            })
        );
    }

    tokenGetter() {
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            if (sessionStorage.getItem('token')) {
                return sessionStorage.getItem('token');
            }
        }
    }

    loggedIn() {
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            return !this.jwtHelper.isTokenExpired(token);
        } else {
            const token = sessionStorage.getItem("token");
            return !this.jwtHelper.isTokenExpired(token);
        }
    }


}
