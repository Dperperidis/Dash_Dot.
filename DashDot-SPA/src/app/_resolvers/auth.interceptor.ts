import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private inj: Injector,
        private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authService = this.inj.get(AuthService);
        const token = authService.tokenGetter();
        if (token) {
            if (authService.jwtHelper.isTokenExpired(token)) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user");
                authService.decodedToken = null;
                authService.currentUser = null;
                this.router.navigate(['/login']);
            }
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(req).pipe(
            map(event => {
                return event;
            }),
            catchError(error => {
                const err = (typeof error) === 'string' ? error :
                    'Σφάλμα εφαρμογής. Προσπάθησε πάλι σε λίγο.';
                return throwError(err);
            }),
            finalize(() => {
            })
        );
    }
}

export let AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};

