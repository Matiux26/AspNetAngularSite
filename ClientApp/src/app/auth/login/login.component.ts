import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User;
  private invalidLogin: boolean;
  private loggedIn = false;

  constructor(
    private router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.user = new User();
  }

  public loginUser(): void {
    this._authService.loginUser(this.user).subscribe(
      response => {
        let token = (<any>response).token;
        localStorage.setItem("jwt", token);
        this.invalidLogin = false;
        this.router.navigate(['/']);
        this.loggedIn = true;
        this._authService.onLoginEvent.emit(this.loggedIn);
        return true;
      },
      error => {
        this.invalidLogin = true;
      }
    )
  }
}
