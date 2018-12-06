import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Product } from "../_models/product";
import { Observable } from "rxjs";
import { Message } from "../_models/message";
import { PaginatedResult } from "../_models/pagination";
import { map } from "rxjs/operators";
import { Photo } from "../_models/photo";

@Injectable({
    providedIn: "root"
})
export class AdminProductService {
    baseUrl = environment.apiUrl;
    currentProduct: any;


    constructor(private http: HttpClient) { }


    setMainPhoto(productId: number, id: number) {
        return this.http.post(this.baseUrl + "products/" + productId + "/photos/" + id + "/setMain", {});
    }

    deletePhoto(productId: number, id: number) {
        return this.http.delete(this.baseUrl + 'products/' + productId + '/photos/' + id);
    }

    updateProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.baseUrl + 'products/updateProduct', product);
    }

    deleteProduct(id: number) {
        return this.http.delete(this.baseUrl + 'products/' + id);
    }

    addProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.baseUrl + "products/addProduct", product);
    }

    deleteSize(id: number) {
        return this.http.delete(this.baseUrl + 'products/deleteSize/' + id);
    }

    getMessages(page?, itemsPerPage?): Observable<PaginatedResult<Message[]>> {
        const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();
        let params = new HttpParams();
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }
        return this.http.get<Message[]>(this.baseUrl + 'admincust/getMessages', { observe: 'response', params })
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

    getProductsByCategoryForAdmin(category: string, sortBy?, page?, itemsPerPage?): Observable<PaginatedResult<Product[]>> {
        const paginatedResult: PaginatedResult<Product[]> = new PaginatedResult<Product[]>();
        let params = new HttpParams();
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }

        return this.http.get<Product[]>(this.baseUrl + 'products/getProductsByCategory/' + category + '/' +
            sortBy, { observe: 'response', params })
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

    deleteMessage(id) {
        return this.http.delete(this.baseUrl + 'admincust/deleteMessage/' + id);
    }

    getMessagesForAdmin(): Observable<Message[]> {
        return this.http.get<Message[]>(this.baseUrl + 'admincust/getMessagesForAdmin');
    }

    // orders

    getOrders(page: number, pageSize: number, order: string, status: string, search: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}shoppingcart/orders/${page}/${pageSize}/${order}/${status}/${search}`);
    }
}
