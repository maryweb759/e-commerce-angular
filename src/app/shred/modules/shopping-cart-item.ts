import { Product } from './product';
export class ShoppingCartItem {
    // we call one product from here
    constructor(public product: Product, public quantity: number) { } 
    // for one product
    get totalPrice() {
         return this.product.price * this.quantity;
     }
} 