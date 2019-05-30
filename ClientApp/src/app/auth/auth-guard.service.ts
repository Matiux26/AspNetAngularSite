import { Injectable, EventEmitter } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  onLogoutEvent: EventEmitter<any> = new EventEmitter();
  
  constructor(private jwtHelper: JwtHelperService, private router: Router) { }

  canActivate() {
    var token = localStorage.getItem('jwt');
 
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }

  checkIfLoggedIn() {
    if (localStorage.getItem('jwt') == null) {
      return false;
    } else {
      return true;
    }
  }

  logOut() {
    localStorage.removeItem("jwt");
    this.onLogoutEvent.emit(null);
  }
}
