import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shred/modules/order';
import { ShoppingCart } from 'src/app/shred/modules/shopping-cart';
import { AuthService } from 'src/app/shred/services/auth.service';
import { OrderService } from 'src/app/shred/services/order.service';

@Component({
  selector: 'app-shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.scss']
})
export class ShoppingFormComponent implements OnInit, OnDestroy {
  shipping: any = {} 
  @Input('cart') cart: ShoppingCart;
  userSubscriblion: Subscription;
  userId: string;
  constructor(private router: Router, 
    private authService: AuthService, 
    private orderService: OrderService) { }

  ngOnInit(): void { 
    // check if the userId is equal to the user Id of the user who placed the order
    this.userSubscriblion = this.authService.user$.subscribe(user => this.userId = user.uid)
  }

 ngOnDestroy() {
   this.userSubscriblion.unsubscribe();
 } 

 async placeOrder() {
   const order = new Order(this.userId, this.shipping, this.cart);
   const result = await this.orderService.placeOrder(order);
   this.router.navigate(['/order-success', result.key]);
 }
}
