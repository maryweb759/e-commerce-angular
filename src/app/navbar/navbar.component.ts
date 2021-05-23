import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shred/services/auth.service';
import { AppUser } from '../shred/modules/app-user';
import { ShoppingCart } from '../shred/modules/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../shred/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 isOpen: boolean = false;
 appUser: AppUser; 
 shoppingCartCount: number; 
 cart$: Observable<ShoppingCart>
  constructor(private auth: AuthService,
    private cartService: ShoppingCartService) { }

 async ngOnInit() {
   this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
   // get the the user cartId
   this.cart$ = await this.cartService.getCart(); 
   console.log(this.cart$);
   
  }
  login() { 
    this.auth.login();
  }
  logout() {
    this.auth.logout();    
  }

  toggleNavbar() { 
    this.isOpen = !this.isOpen;
  } 

}
