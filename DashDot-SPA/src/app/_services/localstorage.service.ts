import { Injectable } from "@angular/core";
import { ShoppingCart, Item } from '../_models/shoppingcart';

@Injectable({
    providedIn: "root"
})
export class LocalStorageService {

    constructor() { }

    getShoppingCart(): ShoppingCart {
        const cart = localStorage.getItem('shoppingcart');
        if (!cart) { return null; }
        const shoppingcart = JSON.parse(cart);
        // if (shoppingcart.created) {  }
        return shoppingcart;
    }
    setShoppingCart(cart: ShoppingCart) {
        localStorage.setItem('shoppingcart', JSON.stringify(cart));
    }


}
