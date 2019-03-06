import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { UserDetails } from '../models/user-details';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  private userDetails: UserDetails;

  headers = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  onLoginEvent: EventEmitter<any> = new EventEmitter();

  loginUser(user) {
    return this.http.post('/api/auth/login', user, this.headers);
  }

  getUsers() {
    return this.http.get('/api/users');
  }

  getUser(id) {
    return this.http.get('/api/Users/' + id);
  }

  addUser(user) {
    let body = JSON.stringify(user);
    return this.http.post('/api/Users', body, this.headers);
  }

  deleteUser(user) {
    return this.http.delete('/api/Users/' + user.id);
  }

  addUserDetails(userDetails) {
    let body = JSON.stringify(userDetails);
    return this.http.post('/api/User_info/', body, this.headers);
  }

  updateUserDetails(userDetails) {
    let body = JSON.stringify(userDetails);
    return this.http.put('/api/User_info/' + userDetails.id, body, this.headers);
  }

  getUserDetails(id) {
    return this.http.get('/api/User_info/' + id);
  }

  getDecodedToken() {
    var token = localStorage.getItem("jwt");
    var tokenData = this.jwtHelper.decodeToken(token);
    return tokenData;
  }
}
