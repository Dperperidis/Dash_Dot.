import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Product } from "../_models/product";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class ProductService {
    baseUrl = environment.apiUrl;
    show = false;
    editShow = false;

    constructor(private http: HttpClient) {
    }

    addProduct(product: Product):Observable<Product> {
        return this.http.post<Product>(this.baseUrl + "products/addProduct", product);
    }

    getProductById(id: number):Observable<any>{
        return this.http.get<any>(this.baseUrl + "products/" + id);
    }



    productShow() {
        this.show = !this.show
    }

    editProductShow() {
        this.editShow = !this.editShow;
    }
}