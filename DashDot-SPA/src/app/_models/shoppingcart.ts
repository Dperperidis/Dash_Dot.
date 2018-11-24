import { User } from "./User";
import { Product } from "./product";

export class ShoppingCart {
    id: string;
    userId: string;
    user: User;
    created: Date;
    items: Array<Item>;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    city: string;
    area: string;
    mobile: string;
    postalCode: number;
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
