import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/shred/modules/shopping-cart';

@Component({
  selector: 'app-checkout-summary',
  templateUrl: './checkout-summary.component.html',
  styleUrls: ['./checkout-summary.component.scss']
})
export class CheckoutSummaryComponent implements OnInit {
@Input('cart') cart: ShoppingCart
  constructor() { }

  ngOnInit(): void {
  }

}
