import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root' 
})
export class OrderService {
changes = {}
  constructor(private db: AngularFireDatabase, private shoppingService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingService.clearCart(); 
    return result
  } 

  getOrders() {
    return this.db.list('/orders');
  } 

  getOrderByUser(userId) {
    // return order that has the same userId property in the order list as the 
    //userId in the user auhentifaction
    // the order ID must be equal to the user Id
    return this.db.list('/orders' , ref => ref.orderByChild('userId').equalTo(userId) )
    
  } 

  get(orderId) {
    return this.db.object('/orders/' + orderId);
  }
}
