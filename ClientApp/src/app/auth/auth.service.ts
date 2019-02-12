import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;

  headers = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  constructor(private http: HttpClient) { }

  getUsers() {
    console.log(this.http.get('/api/Users'));
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
}
