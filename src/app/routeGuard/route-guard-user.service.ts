import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardAdminService implements CanActivate {

  constructor(private router :  Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     
     if(localStorage.getItem("token")){
        if(localStorage.getItem("role") == "ROLE_ADMIN"){
          return true;
        }

        this.router.navigateByUrl("/user");
     }
     
     this.router.navigateByUrl("/");
     return false;
  }
}
