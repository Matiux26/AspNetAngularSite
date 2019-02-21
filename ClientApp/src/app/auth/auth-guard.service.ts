import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private jwtHelper: JwtHelperService, private router: Router) { }

  canActivate(): boolean {
    var token = localStorage.getItem('jwt');
 
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    console.log('navigate');
    this.router.navigate(['/auth/login']);
    return false;
  }

  checkIfLoggedIn(): boolean {
    if (localStorage.getItem('jwt') != null) {
      return false;
    } else {
      return true;
    }
  }

  logOut(): void {
    localStorage.removeItem("jwt");
  }
}
