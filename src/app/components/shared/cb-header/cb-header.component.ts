import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cb-header',
  templateUrl: './cb-header.component.html',
  styleUrls: ['./cb-header.component.scss']
})
export class CbHeaderComponent implements OnInit {
  toggleOnMobile = false;
  constructor(private router: Router) { }

  ngOnInit() { 
   }

  isUserLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  logUserOut() {
    localStorage.removeItem('token');
    setTimeout(() => { this.router.navigate(['/login']); }, 500);
  }
  redirectToLogIn () {
    this.router.navigate(['/login']);
  }
  redirectToRegister () {
    this.router.navigate(['/register']);
  }

}
