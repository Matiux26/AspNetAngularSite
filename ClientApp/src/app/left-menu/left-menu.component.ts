import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  opened = true;
  events = [];
  role: any;

  constructor(private _authService: AuthService) {
    this.role = null;
    _authService.onLoginEvent.subscribe(
      (loggedIn) => {
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
