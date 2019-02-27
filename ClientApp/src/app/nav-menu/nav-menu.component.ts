import { Component, OnInit, Input } from '@angular/core';
import { AuthGuardService } from '../auth/auth-guard.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{

  @Input() inputSideNav: MatSidenav;

  ngOnInit(): void {
  }

  isExpanded = false;
  private loggedIn = false;

  constructor(private authGuard: AuthGuardService) { }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  toggleLoginButton(){
    this.loggedIn = this.authGuard.checkIfLoggedIn();
    this.ngOnInit();
  }
}
