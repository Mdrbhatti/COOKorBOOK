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
  loginStatus = '';

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
    this.authService.login(this.username, this.password).subscribe(
      (res: any) => {
        this.loginStatus = 'success';
        localStorage.setItem('token', res.token);
        localStorage.setItem('userType', res.userType);
        localStorage.setItem('id', res.id);
        console.log("Access Token : \n" + res.token + "\nid: " + res.id);
        setTimeout(() => { this.router.navigate(['/find-food']); }, 2000);
      },
      (error) => { console.log(error); this.loginStatus = 'fail' }
    );
  }
}
