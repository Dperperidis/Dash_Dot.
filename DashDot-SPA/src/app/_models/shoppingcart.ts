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
    area: string;
    mobile: string;
    zipCode: string;
    state: string;
    paymentMethod: PaymentMethod;
    constructor() {
        this.items = new Array<Item>();
        this.created = new Date();
        this.paymentMethod = 0;
    }
}

export class Item {
    id: number;
    productId: number;
    product: Product;
    quantity: number;
    size: string;
    color: string;
}

export enum PaymentMethod {
    Cash,
    Paypal
}
