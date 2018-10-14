import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";


@Injectable({
    providedIn: "root"
})
export class Routing {

    constructor(private productService: ProductService) { }

    show = false;
    search = false;
    find = false;


    productShow() {
        this.find = false;
        this.show = true;
        console.log(this.show);

    }


    findProduct() {
        this.find = true;
        this.show = false;
    }

    prodSearch() {
        return this.productService.getProducts();
    }
}

