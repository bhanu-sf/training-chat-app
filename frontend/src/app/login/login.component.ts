import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {
    (this.username = ''), (this.password = '');
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['chat'])
    }
  }

  login() {
    this.http.post(`${environment.baseUrl}/auth/login`, {
        username: this.username,
        password: this.password,
        client_id: '1001',
        client_secret: 'thisisclientsecret',
      }).pipe(
        mergeMap((res: any) => this.http.post(`${environment.baseUrl}/auth/token`, {
          code: res.code,
          clientId: '1001'
        }))
      ).subscribe((res: any) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.router.navigate(['chat']);
      });
  }
}
