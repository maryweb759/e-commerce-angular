import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../../modules/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../modules/product';
import { AppUser } from '../../modules/app-user'; 
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
}) 
export class ProductCartComponent implements OnInit {
  @Input('product') product :Product;
  @Input('show-actions') showActions = true; 
  @Input('shopping-cart') shoppingCart : ShoppingCart; 
 // wishlist 
 @Input() addedToWishlist: boolean;
 @Input() productItem: Product;
keyItem: any
  appUser: AppUser; 
  constructor(
    private carService: ShoppingCartService,
    private auth: AuthService,
    private _route: Router, 
    ) { 
      this.auth.appUser$.subscribe(appUser => this.appUser= appUser)
    }

  ngOnInit(): void {
  }

 addToCart() {
  this.carService.addToCart(this.product); 
 } 
// get the product ID from the url 
 editProduct(product) {
   this._route.navigate(['/admin/products', product.key]);
 } 


}
