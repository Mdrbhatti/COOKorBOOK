import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  loginSuccess: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  isUsernameValid(){
    return this.username.length > 3;
  }

  isPasswordValid() {
    return this.password.length > 3;
  }
  logInUser(){
    this.loginSuccess = true;
    setTimeout(() => {this.router.navigate(['/find-food']);}, 2000);
  }
}
