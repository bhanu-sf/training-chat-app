import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: SocialUser | null = null;
  loggedInWithGoogle: boolean = false;

  constructor(private router: Router, private googleAuthService: SocialAuthService) { }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
