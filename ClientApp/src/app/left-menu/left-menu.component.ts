import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AuthGuardService } from '../auth/auth-guard.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  opened = true;
  events = [];
  role: any;

  constructor(private _authService: AuthService, private _authGuardService: AuthGuardService) {
    this.role = null;
    _authService.onLoginEvent.subscribe(
      (loggedIn) => {
        this.checkUserRole();
      }
    );
    _authGuardService.onLogoutEvent.subscribe(
      () => {
        this.checkUserRole();
      }
    );
  }
  checkUserRole() {
    this.role = this._authService.checkUserRole();
  }
  ngOnInit() {
    this.checkUserRole();
  }

}
