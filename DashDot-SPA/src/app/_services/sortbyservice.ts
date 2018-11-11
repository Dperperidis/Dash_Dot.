import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ProductService } from "./product.service";
import { Product } from "../_models/product";

@Injectable({
    providedIn: "root"
})
export class SortByService {
    baseUrl = environment.apiUrl;
    currentSortByList: Product[];

    constructor(private http: HttpClient,
        private productService: ProductService) { }




}