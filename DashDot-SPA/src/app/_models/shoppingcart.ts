import { User } from "./User";
import { Product } from "./product";


export class Order {
    id: string;
    orderDate: Date;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    mobile: string;
    postalCode: string;
    city: string;
    area: string;
    total: number;
    orderItems: Array<OrderItem>;
    paypalInformationId: string;
    paypalInformation: PaypalInformation;
    orderStatus: OrderStatus;
    paymentMethod: PaymentMethod;
    constructor() {
        this.orderItems = new Array<OrderItem>();
        this.paymentMethod = PaymentMethod.Cod;
    }
}

export class OrderItem {
    id: number;
    OrderId: string;
    Order: Order;
    ProductId: number;
    Product: Product;
    Quantity: number;
    Color: string;
    Size: string;
    Price: number;
}

export class PaypalInformation {
    cartId: string;
    createTime: Date;
    paypalId: string;
    intent: string;
    total: string;
    currency: string;
    payerEmail: string;
    payerName: string;
    payerLastname: string;
    payerMiddleName: string;
    payerId: string;
}

export class CartItem {
    id: number;
    userId: string;
    user: User;
    dateCreated: Date;
    productId: number;
    product: Product;
    quantity: number;
    color: string;
    size: string;
}

export enum OrderStatus {
    Pending, // Σε εξέλιξη
    Completed, // Ολοκληρωμένη
    Shipping, // Σε αποστολή
    Canceled   // Ακυρωμένη
}

export enum PaymentMethod {
    Cod, // Cash on Delivery (αντικαταβολή)
    Paypal
}
