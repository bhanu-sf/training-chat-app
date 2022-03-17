import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    this.http
      .post('http://localhost:3000/auth/login', {
        username: this.username,
        password: this.password,
        client_id: '1001',
        client_secret: 'thisisclientsccret',
      })
      .subscribe((res: any) => {
        localStorage.setItem('token', res.code);
        this.router.navigate(['chat']);
      });
  }
}
