import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Product } from "../_models/product";
import { Observable, BehaviorSubject } from "rxjs";
import { PaginatedResult } from "../_models/pagination";
import { map } from "rxjs/operators";
import { Message } from "../_models/message";

@Injectable({
    providedIn: "root"
})

export class ProductService {
    baseUrl = environment.apiUrl;
    currentProduct: any;
    currentSortByList: any[];

    constructor(private http: HttpClient) { }



    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(this.baseUrl + "products/" + id);
    }

    getProductBySeoUrl(seoUrl: string): Observable<Product> {
        return this.http.get<Product>(this.baseUrl + "customers/getProductBySeoUrl/" + seoUrl);
    }

    getProductByCode(code: string): Observable<Product> {
        return this.http.get<Product>(this.baseUrl + "products/getProductByCode/" + code);
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl + "products");
    }


    getProductsByCategory(category: string, page?, itemsPerPage?): Observable<PaginatedResult<Product[]>> {
        const paginatedResult: PaginatedResult<Product[]> = new PaginatedResult<Product[]>();
        let params = new HttpParams();

        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }

        return this.http.get<Product[]>(this.baseUrl + 'customers/getProductsByCategory/' + category, { observe: 'response', params })
            .pipe(
                map(response => {
                    paginatedResult.result = response.body;
                    if (response.headers.get('Pagination') != null) {
                        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                    }
                    return paginatedResult;
                })
            );
    }

    getProductsByLine(line: string, page?, itemsPerPage?): Observable<PaginatedResult<Product[]>> {
        const paginatedResult: PaginatedResult<Product[]> = new PaginatedResult<Product[]>();
        let params = new HttpParams();
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }
        return this.http.get<Product[]>(this.baseUrl + 'customers/getProductsByLine/' + line, { observe: 'response', params })
            .pipe(
                map(response => {
                    paginatedResult.result = response.body;
                    if (response.headers.get('Pagination') != null) {
                        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                    }
                    return paginatedResult;
                })
            );
    }

    saveMessage(message: Message): Observable<Message> {
        return this.http.post<Message>(this.baseUrl + '/customers/addMessage', message);
    }

}
