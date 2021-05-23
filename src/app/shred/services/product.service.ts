import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
}) 
export class ProductService {

  constructor(private db: AngularFireDatabase) { } 
// everytime we create a product firebase give him a unique key to get that unique
// key in the url and be able to get all the product details  
// if we use valueChanges we wont get the key - with snapshotchanges we will get the key
  create(product) {
    this.db.list('/products').push(product)
  } 
   //to get all the products u nedd to use list(DBname) 
   getAll() {
    return this.db.list('/products');
  } 
  
// to get a product u need a specific id 
  get(productID) {
    return this.db.object('/products/' + productID)
  } 
 
  update(productID, product) {
    return this.db.object('/products/'+ productID).update(product);
  } 

  remove(productID) {
    return this.db.object('/products/'+ productID).remove()
  }
}
