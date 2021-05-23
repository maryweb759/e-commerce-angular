import {ShoppingCartItem} from './shopping-cart-item';
import {Product} from './product';

export class ShoppingCart {
  // all the items in cart 
  // we use items when we retrive the items from ShoppingCart list in - shoppingCartComponent 
    items: ShoppingCartItem[] = []; 
    // itemsmap is an object and poductId is the key , the ShoppingCartItem is the value and we 
    // have the quantity and the Poduct on it 
    constructor(public key: string, public itemsMap: {[productId: string]: ShoppingCartItem}) {
              // if there is products on the itemsMap return the Products else return an empty obj
        this.itemsMap = this.itemsMap || {}; 
         // we loop through all the items IDs in the shoppingCart and push them to the items array
        for (let productId in itemsMap) {
            // loop through the items ID and get the IDS of all the product to access 
            // the key of the itemsMap and push the value of it to ShoppingCartItems
          const item = itemsMap[productId];
          // we pushed everysingle product with the Product and the quantity
          this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
     }  

    //loop through one product
    getQuantity = (product: Product) => {
      // get the product id from the itemsMap obj
      // access the they keys of the poducts module
       //we use itemsMap cause it has a quantity param that we are looking for 
      let item = this.itemsMap[product.key];
      //return the product value - get the product quantity or return 0
      return item ? item.quantity : 0;
    } 

    // the price of all the product
    get totalCount() { 
        let sum = 0;
        // loop throught the obj and get the product 
        for (let productId in this.items) {
          // loop through the items array that we pushed the product to early on and loop throught all 
          // the product to  get specifique product  price
          sum += this.items[productId].totalPrice; 
        } 
        return sum;
    } 

// get all the items quantity in shoppingCart 
    get totalItemsCount() {
        let count = 0;
        // we get the quantity from itemsMap because it is a parametre of shoppingCartItems <itemsMap>
        for (let productId in this.itemsMap) 
        count += this.itemsMap[productId].quantity;
        return count;
    }
}