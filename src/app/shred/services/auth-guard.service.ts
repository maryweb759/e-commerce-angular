import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private _route: Router) { } 
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    {
    return this.auth.user$.pipe(map( user => { 
        if (user) return true; 

        this._route.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false
      }
    ))
  }

}
