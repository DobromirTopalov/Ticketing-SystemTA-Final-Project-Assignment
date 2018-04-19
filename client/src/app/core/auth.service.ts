import { HttpOptions } from './../models/core/http-options';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AppConfig } from './../config/app.config';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

// TODO
import { User } from '../models/users/user';

import 'rxjs/add/operator/map';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthService {
  constructor(private appConfig: AppConfig, private http: HttpClient, private jwtService: JwtHelperService) { }
  register(user: User, options?: HttpOptions): Observable<Object> {
    return this.http.post(`${this.appConfig.apiUrl}/register`, user, options);
  }

  login(user: User, options?: HttpOptions): Observable<Object> {
    return this.http.post(`${this.appConfig.apiUrl}/login`, user, options);
  }

  isAuthenticated(): boolean {
    const token = this.jwtService.tokenGetter();
    const decoded = this.jwtService.decodeToken(token);
    return !!token && !this.jwtService.isTokenExpired(token) && decoded.iss === this.appConfig.jwt_issuer;
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }
}
