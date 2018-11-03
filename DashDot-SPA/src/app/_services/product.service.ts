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

    getProductBySeoUrl(seoUrl: string): Observable<Product> {
        return this.http.get<Product>(this.baseUrl + "customers/getProductBySeoUrl/" + seoUrl);
    }

    getProductByCode(code: string): Observable<Product> {
        return this.http.get<Product>(this.baseUrl + "products/getProductByCode/" + code);
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl + "products")
    }


    getProductsByCategory(category: string) : Observable<Product[]>{
        return this.http.get<Product[]>(this.baseUrl + 'products/getProductsByCategory/'+ category)
    }

    getProductsByLine(line: string) : Observable<Product[]>{
        return this.http.get<Product[]>(this.baseUrl+ 'customers/getProductsByLine/'+ line)
    }

    




}