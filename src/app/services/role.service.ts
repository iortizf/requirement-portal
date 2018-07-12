import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user.firoleid === 2 || user.firoleid === 3) {
      console.error("Usuario no autorizado para ver este contenido");
      this.router.navigate(["request"]);
      return false;
    }   
    return true;
  }
}
