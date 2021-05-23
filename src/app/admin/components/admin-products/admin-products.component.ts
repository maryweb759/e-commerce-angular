import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/shred/modules/product';
import { ProductService } from 'src/app/shred/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
products: Product[]; 
filteredProducts: any[];
subscribe: Subscription;
displayedColums: string[] = ['title', 'price', 'edit'];
dataSource: any;

  constructor(private productService: ProductService) { 
    this.subscribe = this.productService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val() as Object })))
    ).subscribe((products: any) => {
      this.products = products 
      console.log(this.products );
      
    })
  }

  ngOnInit(): void {
  } 

  

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
