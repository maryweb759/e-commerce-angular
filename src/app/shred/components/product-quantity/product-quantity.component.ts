import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../modules/product'; 
import { ShoppingCart } from '../../modules/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent implements OnInit {
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  @Input('product') product: Product;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

addToCart() {
  this.cartService.addToCart(this.product);
} 

removeFromCart() {
  this.cartService.removeFromCart(this.product);
}
}
