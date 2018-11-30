import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { User } from "../_models/User";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class UserService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getUser(id): Observable<User> {
        return this.http.get<User>(this.baseUrl + "users/" + id);
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>(this.baseUrl + 'users/updateUser/', user);
    }

}
