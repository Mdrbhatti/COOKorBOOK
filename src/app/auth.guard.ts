import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    // Check to see if a user has a valid JWT
    const data = localStorage.getItem('token');
    if (data === null) {
      // If they do, return true and allow the user to load the home component
      console.log("No access token found!");
      this.router.navigate(['login']);
      return false;
    }

    // If not, they redirect them to the login page
    return true;
  }
}