import { Component, OnInit, Input } from '@angular/core';
import { AuthGuardService } from '../auth/auth-guard.service';
import { MatSidenav } from '@angular/material';
import { ShopService } from '../shop/shop.service';
import { AuthService } from '../auth/auth.service';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  @Input() inputSideNav: MatSidenav;

  ngOnInit() {
  }

  isExpanded = false;
  private loggedIn = false;
  cartQuantity: number;
  login: any;

  constructor(private _authService: AuthService, private _authGuard: AuthGuardService,
     private _shopService: ShopService,private route: ActivatedRoute, private router: Router,
     jwtHelper: JwtHelperService) {
    _shopService.onAddToCartEvent.subscribe(
      (cartQuantity) => {
        this.cartQuantity = cartQuantity;
      }
    );
    _authService.onLoginEvent.subscribe(
      (loggedIn) => {
        this.loggedIn = loggedIn;
        var decodedToken = this._authService.getDecodedToken();
        this.login = decodedToken.name;
      }
    );
  }
  logOut(){
    this._authGuard.logOut();
    this.loggedIn = false;
    this.router.navigate(['/']);
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  toggleLoginButton() {
    this.loggedIn = this._authGuard.checkIfLoggedIn();
    this.ngOnInit();
  }
}
