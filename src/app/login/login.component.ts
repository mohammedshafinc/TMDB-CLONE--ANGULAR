import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  errorMsg: string = "";


  constructor(private router: Router ,private auth:AuthService) {}

  ngOnInit(): void {}

  login(): void {
    if (this.username.trim().length === 0) {
      this.errorMsg = "Username is required";
    } else if (this.password.trim().length === 0) {
      this.errorMsg = "Password is required";
    } else {
      this.errorMsg = "";
      // Make sure that the auth service or object provides a login() method
      let res = this.auth.login(this.username, this.password);
      if (res === 200) {
        this.router.navigate(['home']);
      } else if (res === 403) {
        this.errorMsg = "Invalid Credentials";
      } else {
        this.errorMsg = "Login failed";
      }
    }
  }
}
