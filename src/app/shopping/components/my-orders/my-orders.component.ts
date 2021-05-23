import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/shred/services/auth.service';
import { OrderService } from 'src/app/shred/services/order.service'; 
import { Order } from '../../../shred/modules/order'
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent  {
  orders$
  orders:Order;
;
  constructor(orderService: OrderService, authService: AuthService) { 
    // loop through all the users Id and get the userId that maches the userOrdered Id 
  //this.orders$ = authService.user$.pipe(switchMap(user => {
    
    
     // if the iserId equal to the users Id whome asked for the order then get the value and key
     this.orders$ = authService.user$.pipe(switchMap(user => {
       console.log(user.uid, this.orders$['key']);
        
       return orderService.getOrderByUser(user.uid).snapshotChanges()
       .pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Object })   
       )))
     }))
  
  }

 
}
