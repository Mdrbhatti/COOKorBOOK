import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  username = '';
  password = '';
  loginSuccess = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  isUsernameValid() {
    return this.username.length > 3;
  }

  isPasswordValid() {
    return this.password.length > 3;
  }

  logInUser() {
    this.loginSuccess = true;
    this.authService.login(this.username, this.password).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        console.log("Access Token : \n" + res.token);
        setTimeout(() => { this.router.navigate(['/find-food']); }, 2000);
      },
      (error) => { console.log(error); }
    );
  }
}
