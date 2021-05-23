import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from './shred/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './shred/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent implements OnInit { 
  title = 'flowerBlog'; 
  constructor(
    private _auth: AuthService, 
    private _router: Router,
    private _userService: UserService 
  ) {
    _auth.user$.subscribe(user => {
      if(user) {
        if(!user) return;
        this._userService.save(user);

        const returnUrl = sessionStorage.getItem('returnUrl');
        if(!returnUrl) return;
        
        sessionStorage.removeItem('returnUrl');
        this._router.navigateByUrl(returnUrl);
      }
    });
  } 
  ngOnInit() {
   
  }  
 
}
