import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private user: User;
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private _authService: AuthService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]]
    });
    this.user = new User();
  }

  get f() { return this.registerForm.controls; }

  public addUser() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.user.role = "User";
    this.user.login = this.registerForm.value["login"];
    this.user.password = this.registerForm.value["password"];
    this.user.email = this.registerForm.value["email"];
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


