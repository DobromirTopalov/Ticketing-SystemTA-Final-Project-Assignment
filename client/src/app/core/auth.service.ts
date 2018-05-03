import { HttpOptions } from './../models/core/http-options';
import { HttpClient, HttpResponse, HttpRequest } from '@angular/common/http';
import { AppConfig } from './../config/app.config';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

// TODO
import { User } from '../models/users/user';

import 'rxjs/add/operator/map';
import { JwtHelperService } from '@auth0/angular-jwt';
import { decode } from '@angular/router/src/url_tree';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthService {
  public user: BehaviorSubject<User>;
  public isAuth: BehaviorSubject<boolean>;

  constructor(private appConfig: AppConfig, private http: HttpClient, private jwtService: JwtHelperService) {
    const token = this.jwtService.tokenGetter();
    if (token) {
      const decoded = this.jwtService.decodeToken(token);
      this.user = new BehaviorSubject<User>(decoded);
      this.isAuth = new BehaviorSubject<boolean>(true);
    }else{
      this.user = new BehaviorSubject<User>(new User());
      this.isAuth = new BehaviorSubject<boolean>(false);

    }
   }
  register(user: User, options?: HttpOptions): Observable<Object> {
    return this.http.post(`${this.appConfig.apiUrl}/register`, user, options);
  }

  login(user: User, options?: HttpOptions): Observable<Object> {
    return this.http.post(`${this.appConfig.apiUrl}/login`, user, options);
  }

  isAuthenticated(): boolean {
    const token = this.jwtService.tokenGetter();
    const decoded = this.jwtService.decodeToken(token);
    const isLogged = !!token && !this.jwtService.isTokenExpired(token) && decoded.iss === this.appConfig.jwt_issuer;
    this.isAuth.next(isLogged);
    return isLogged;
  }

  public getUser() {
    const token = this.jwtService.tokenGetter();
    if (token) {
      const decoded = this.jwtService.decodeToken(token);
      this.user.next(decoded);
      return decoded;
    }
    else{
      return null;
    }
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  cachedRequests: Array<HttpRequest<any>> = [];

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.isAuth.next(false);
    this.user.next(new User());
  }
}
