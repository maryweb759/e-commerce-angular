
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../shred/services/category.service';
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../shred/modules/product';
import { ShoppingCart } from '../shred/modules/shopping-cart';
import { ProductService } from '../shred/services/product.service';
import { ShoppingCartService } from '../shred/services/shopping-cart.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
products: Product[] = [];
filteredProducts: Product[] = []; 
subscribe: Subscription;
category: string;
cart: any; 
subscription: Subscription; 
searchKey;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService,
  ) { 
    this.getProducts();
  }

getProducts() {
  this.subscribe = this.productService.getAll().snapshotChanges().pipe(
    map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val() as Object })))
    // loop through all the products 
  ).pipe(switchMap((products: any) => {
   this.products = products; 
   console.log(this.products);
   // return the category name - men or women  
   return this.route.queryParamMap
  })).subscribe(params => {
    this.category = params.get('category');
    this.filteredProducts = (this.category) ? 
    this.products.filter(p => p.category === this.category): this.products
  })
}

 async ngOnInit() {
    this.subscribe = (await this.cartService.getCart()).subscribe(cart => {
      this.cart = new ShoppingCart(cart.key, cart.itemsMap)
    })
  }

  ngOnDestroy() {
  this.subscribe.unsubscribe();
  } 

  getResponse(event) {
    this.searchKey = event
  }
}
