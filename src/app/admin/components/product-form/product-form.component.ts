import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

import { CategoryService } from 'src/app/shred/services/category.service';
import { ProductService } from 'src/app/shred/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
categories$;
product: any = {};
id 


  constructor(
    private router: Router,
    private acRoute: ActivatedRoute, 
    private categoryService: CategoryService,
    private productService: ProductService
  ) { 
    this.categories$ = categoryService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() as object }))
      ))
// get the id from he url
 this.id = this.acRoute.snapshot.paramMap.get('id');
   // if this id matches any product id from product list get the product details
   if (this.id) {
     this.productService.get(this.id).valueChanges().pipe(take(1)).subscribe(p => this.product = p);
   }
 
  }

  save(product) {
    //if the product id is already there update he produc
   if (this.id) this.productService.update(this.id, product);
   else this.productService.create(product);
   this.router.navigate(['/admin/products']);
  } 

  remove() {
    if(!confirm('Are you sure to delete this product ?')) return ;
    this.productService.remove(this.id);
    this.router.navigate(['/admin/products']);
  }
  ngOnInit(): void {
  }

}
