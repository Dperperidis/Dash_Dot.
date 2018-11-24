import { User } from "./User";
import { Product } from "./product";

export class ShoppingCart {
    id: string;
    userId: string;
    user: User;
    created: Date;
    items: Array<Item>;
    name: string;
    lastname: string;
    address: string;
    email: string;
    city: string;
    state: string;
    zipCode: string;
    constructor() {
        this.items = new Array<Item>();
        this.created = new Date();
    }
}

export class Item {
    id: number;
    productId: number;
    product: Product;
    quantity: number;
    size?: string;
    color: string;
}
