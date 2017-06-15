import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  constructor() { }

  ngOnInit() {
  }

  isUsernameValid(){
    return this.username.length > 3;
  }

  isPasswordValid() {
    return this.password.length > 3;
  }
}
