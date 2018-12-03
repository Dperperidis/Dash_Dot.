import { Injectable } from "@angular/core";
import { CartItem } from '../_models/shoppingcart';

@Injectable({
    providedIn: "root"
})
export class LocalStorageService {

    constructor() { }

    getShoppingCart(): Array<CartItem> {
        const cart = localStorage.getItem('shoppingcart');
        if (!cart) { return null; }
        const shoppingcart = JSON.parse(cart);
        // if (shoppingcart.created) {  }
        return shoppingcart;
    }
    setShoppingCart(cart: Array<CartItem>) {
        localStorage.setItem('shoppingcart', JSON.stringify(cart));
    }


}
