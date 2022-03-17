import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbChatModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginComponent } from './login/login.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { GoogleLoginComponent } from './google-login/google-login.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, ChatPageComponent, GoogleLoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbChatModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '695789578131-0onh65seki8flg58raf6k354722bi9qd.apps.googleusercontent.com'
            ),
          },
        ],
        onError: (err: any) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
