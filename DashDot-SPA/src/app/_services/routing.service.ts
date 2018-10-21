import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";


@Injectable({
    providedIn: "root"
})
export class Routing {

    constructor(private productService: ProductService) { }

    prodSearch() {
        return this.productService.getProducts();
    }
}

