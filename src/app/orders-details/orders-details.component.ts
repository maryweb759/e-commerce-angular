import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Order } from '../shred/modules/order';
import { OrderService } from '../shred/services/order.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent implements OnInit {
orderId: string;
ordersInfo: Order
  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    if (this.orderId) {
      this.orderService.get(this.orderId).valueChanges()
      .pipe(take(1))
      .subscribe((order: any) => this.ordersInfo = order);
      console.log(this.ordersInfo);

    }
  }

}
