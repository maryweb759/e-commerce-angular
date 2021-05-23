import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/shred/services/category.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit { 
  categories$;
 @Input() category: string;
 @Output() searchResponse = new EventEmitter<any>();
  constructor(private categoryService: CategoryService) {
    this.getCategories();
   }

  getCategories() {
    this.categories$ = this.categoryService.getAll().snapshotChanges().pipe(map(
      changes => changes.map(c => ({key: c.payload.key, ...c.payload.val() as Object }))
      ))
  }
  ngOnInit(): void {
  }

  searchProducts(productKey) {
   this.searchResponse.emit(productKey);
  }
}
