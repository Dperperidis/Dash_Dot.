import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { User } from "../_models/User";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})

export class AuthService {
    baseUrl = environment.apiUrl;
    user: User;
    jwtHelper = new JwtHelperService();
    decodedToken: any;
    currentUser: User;

    constructor(private http: HttpClient) {
    }



    private isAdminInSubject$ = new BehaviorSubject<boolean>(false);
    isAdmin$ = this.isAdminInSubject$.asObservable();

    get isAdmin(): boolean { return this.isAdminInSubject$.getValue(); }
    set isAdmin(value: boolean) { this.isAdminInSubject$.next(value); }

    register(user: User) {
        return this.http.post(this.baseUrl + "auth/register", user);
    }

    login(user: any) {
        return this.http.post(this.baseUrl + "auth/login", user).pipe(
            map((response: any) => {
                const user = response;
                if (user) {
                    localStorage.setItem("token", user.token);
                    localStorage.setItem("user", JSON.stringify(user.user));
                    this.decodedToken = this.jwtHelper.decodeToken(user.token);
                    this.isAdmin = this.decodedToken.isAdmin === 'True';
                    this.currentUser = user.user;

                }
            })
        );
    }

    loggedIn() {
        const token = localStorage.getItem("token");
        return !this.jwtHelper.isTokenExpired(token);
    }

}
