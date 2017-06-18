import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string = "";
  username: string = "";
  name: string = "";
  password: string = "";
  registerSuccess: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  // TODO: Proper email validation
  isEmailValid() {
    return this.email.length > 3;
  }

  isUsernameValid(){
    return this.username.length > 3;
  }
  
  isNameValid()  {
    return this.name.length > 3;
  }
  isPasswordValid() {
    return this.password.length > 3;
  }
  registerUser(){
    this.registerSuccess = true;
    setTimeout(() => {this.router.navigate(['/find-food']);}, 2000);
  }

}
