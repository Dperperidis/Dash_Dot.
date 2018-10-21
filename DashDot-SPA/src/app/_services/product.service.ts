import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Product } from "../_models/product";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class ProductService {
    baseUrl = environment.apiUrl;
    currentProduct: any;

    constructor(private http: HttpClient) { }


    addProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.baseUrl + "products/addProduct", product);
    }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(this.baseUrl + "products/" + id);
    }

    getProductByCode(code: string): Observable<Product> {
        return this.http.get<Product>(this.baseUrl + "products/getProductByCode/" + code);
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl + "products")
    }

    setMainPhoto(productId: number, id: number){
        return this.http.post(this.baseUrl + "products/" + productId + "/photos/" + id + "/setMain", {})
    }

    deletePhoto(productId: number, id: number) {
        return this.http.delete(this.baseUrl + 'products/' + productId + '/photos/' + id);
    }

    updateProduct(id: number, product: Product) {
        return this.http.put(this.baseUrl + 'products/' + id, product)
    }

    deleteProduct(id: number){
        return this.http.delete(this.baseUrl + 'products/'+ id)
    }

    getProductsByCategory(category: string) : Observable<Product[]>{
        return this.http.get<Product[]>(this.baseUrl + 'products/getProductsByCategory/'+ category)
    }

    




}