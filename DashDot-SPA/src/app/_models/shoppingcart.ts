import { User } from "./User";
import { Product } from "./product";

export class ShoppingCart {
    id: string;
    userId: string;
    user: User;
    created: Date;
    items: Array<Item>;
    constructor() {
        this.items = new Array<Item>();
    }
}

export class Item {
    id: number;
    productId: number;
    product: Product;
    quantity: number;
}
