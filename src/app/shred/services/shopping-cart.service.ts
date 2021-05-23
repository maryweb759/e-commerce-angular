import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from '../modules/product';
import { ShoppingCart } from '../modules/shopping-cart';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { } 
  // we get all the elements from the Shoppingcart that the user has buy
  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    // get the shoppingCart ID and the Items 
    return this.db.object('/shoppingCart/' + cartId).snapshotChanges().pipe(map(
      x => { 
        let val: any = x.payload.val();
        const key: string = x.payload.key; 
        // if there is items on the cart return iems else return null
        val = val ? val.items : null;
        return new ShoppingCart(key, val)
      }
    ))
  } 

  addToCart(product: Product) {
    return this.updateCart(product, 1)
  }

  removeFromCart(product: Product) {
    return this.updateCart(product, -1)
  }

  async clearCart() {
    // get your cartId from firebase
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shoppingCart/' + cartId + '/items').remove()
  }

  // first we create a a shopping-cart list and it will create an ID automaticly
  // and we push a date to it
 private create() {
   return this.db.list('/shopping-cart').push({
     dateCreated: new Date().getTime()
   })
 }

 private getItem(cartId: string, productId: string) {
   return this.db.object('/shoppingCart/' + cartId + '/items/' + productId);
 }
 // if the cart is created Return the ID from the localstorage else wait for the create()
 private async getOrCreateCartId() {
   let cartId =  localStorage.getItem('cartId'); 
   if (cartId) return cartId; 
   let result = await this.create();

   // result key returns the last part of the reference - the shoppingCartId
   //  - it will get the date from create() function
   localStorage.setItem('cartId', result.key);
   return result.key 
  }
 
  // update 
  private async updateCart(product:Product, change:number) {
    // get the shopping cart id
    let cartId = await this.getOrCreateCartId();
    // get the cart id because every user has a different cartId and get product ID
    let item$ = this.getItem(cartId, product.key) 

    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      const val: any = item.payload.val();
      // if there is a quantity return it else return 0 or return 0 + change
      const quantity = ((val ? val.quantity: 0) || 0) + change;
      // remove all the iems
      if (quantity == 0) item$.remove(); 
      else item$.update({product: product, quantity: quantity});
    })
  }

















}
