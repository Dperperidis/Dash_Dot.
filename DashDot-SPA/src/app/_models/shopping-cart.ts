import { Product } from "./product";

export class ShoppingCart{

    id: string;
    created: Date;
    items: Array<Item>;
    constructor() {
        this.items = new Array<Item>();
    }
}

export class Item {
    id: string;
    product: Product;
    quantity: number;
}