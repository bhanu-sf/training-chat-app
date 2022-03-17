import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit {

  user: SocialUser | null;
  isLoggedIn: boolean;

  constructor(private authService: SocialAuthService) {
    this.user = null;
    this.isLoggedIn = false;
  }

  ngOnInit() {
    console.log(this.authService.authState)
    this.authService.authState.subscribe(u => {
      console.log(u);
    })
  }

  async signInWithGoogle() {
    const user = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.isLoggedIn = true;
  }

  async signOut() {
    await this.authService.signOut();
    this.user = null;
    this.isLoggedIn = false;
  }
}
