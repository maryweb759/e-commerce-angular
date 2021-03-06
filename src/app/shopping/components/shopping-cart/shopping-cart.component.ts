import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shred/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/shred/modules/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart$:Observable<ShoppingCart> ;
  constructor(private cartService: ShoppingCartService) { }

 async ngOnInit() {
   this.cart$ = await this.cartService.getCart()
  }
 
  clearCart() {
    this.cartService.clearCart();
  }
} 
