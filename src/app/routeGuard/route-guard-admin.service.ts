import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RouteGuardUserService implements CanActivate {

  constructor(private router : Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     
      if(localStorage.getItem("token")){
        if(localStorage.getItem("role") == "ROLE_USER"){
          return true;
        }
          this.router.navigateByUrl("/admin");
      }
     
      this.router.navigateByUrl("/");
     return false;
  }
}
