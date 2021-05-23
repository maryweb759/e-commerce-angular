import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ProductCartComponent } from './components/product-cart/product-cart.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { FilterPipe } from './pipe/filter.pipe';
import { SortingPipe } from './pipe/sorting.pipe';
@NgModule({
  declarations: [ ProductCartComponent, ProductQuantityComponent, FilterPipe, SortingPipe],
  imports: [
    CommonModule,
    
  ],
  exports: [ ProductCartComponent, ProductQuantityComponent, FilterPipe, SortingPipe]
})
export class ShredModule { }
