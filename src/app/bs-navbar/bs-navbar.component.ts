import { Component } from '@angular/core';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  constructor(
    public authService: AuthService
  ) { }

  username = String(localStorage.getItem('username'));

  logout(){
    this.authService.logout();
    localStorage.removeItem('username')
  }
}
