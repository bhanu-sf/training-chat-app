import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
