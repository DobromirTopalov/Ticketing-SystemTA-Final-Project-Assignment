import { AuthService } from './core/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private http: HttpClient, private authService: AuthService) { }

  logout(): void {
    return this.authService.logout();
  }
}
