import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private user: User;

  constructor(
    private router: Router,
    private _authService: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.user = new User();
    let token = localStorage.getItem("jwt");
    this.http.get("http://localhost:5000/api/customers", {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      console.log(response);
    }, err => {
      console.log(err)
    });
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


