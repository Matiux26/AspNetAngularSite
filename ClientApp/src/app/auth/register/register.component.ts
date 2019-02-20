import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private user: User;

  constructor(
    private router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.user = new User();
  }

  public addUser(): void {
    this._authService.addUser(this.user).subscribe(
      response => {
        this.router.navigate(['/']);
        return true;
      },
      error => {
        console.log('Error while registering user');
      }
    )
  }
}


