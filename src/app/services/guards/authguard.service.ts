import { Injectable } from '@angular/core';
import {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
 
  constructor(private router:Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage.getItem('currentUser')) {
      console.log("entrando a Auth service true");
        return true;
    }
    // Si el usuario no está logeado se redirecciona a la página de login
    this.router.navigate(["login"]);
    return false;
  }
 
}
