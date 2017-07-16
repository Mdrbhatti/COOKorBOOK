import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  email = '';
  username = '';
  name = '';
  password = '';
  registerStatus = '';
  userType = 'placeholder';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  // Test email validity
  emailValidator(val) {
    // tslint:disable-next-line:max-line-length
    const EMAIL_REGEXP = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    if (!EMAIL_REGEXP.test(val)) {
      return false;
    }
    return true;
  }

  isEmailValid() {
    return this.emailValidator(this.email);
  }

  isUsernameValid() {
    return this.username.length > 3;
  }

  isNameValid() {
    return this.name.length > 3;
  }

  isPasswordValid() {
    return this.password.length > 3;
  }

  isUserTypeValid() {
    return (this.userType.toLowerCase() == "seller" || this.userType.toLowerCase() == "buyer");
  }

  enableButton() {
    return (this.isUserTypeValid && this.isEmailValid() && this.isUsernameValid() && this.isPasswordValid() && this.isNameValid());
  }

  registerUser() {
    this.authService.register(this.name, this.username, this.password, this.email, this.userType).subscribe(
      (res: any) => {
        this.registerStatus = 'success';        
        localStorage.setItem('token', res.token);
        console.log("Access Token : \n" + res.token);
        setTimeout(() => { this.router.navigate(['/find-food']); }, 2000);
      },
      (error) => { console.log(error); this.registerStatus = 'fail';}
    );
  }
}
