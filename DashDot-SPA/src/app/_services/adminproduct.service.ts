import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Product } from "../_models/product";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AdminProductService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    
    setMainPhoto(productId: number, id: number){
        return this.http.post(this.baseUrl + "products/" + productId + "/photos/" + id + "/setMain", {})
    }


    deletePhoto(productId: number, id: number) {
        return this.http.delete(this.baseUrl + 'products/' + productId + '/photos/' + id);
    }

    updateProduct(product: Product) :Observable<Product>{
        return this.http.post<Product>(this.baseUrl + 'products/updateProduct' ,product)
    }

    deleteProduct(id: number){
        return this.http.delete(this.baseUrl + 'products/'+ id)
    }
}