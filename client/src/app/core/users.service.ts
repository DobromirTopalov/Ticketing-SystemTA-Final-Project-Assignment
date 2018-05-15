import 'rxjs/add/operator/map';
import { AppConfig } from '../config/app.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UsersDBModel } from '../models/users/usersDBModel';
import { User } from '../models/users/user';


@Injectable()
export class UsersService {
  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  getAll(): Observable<UsersDBModel> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/users`).map(x => <UsersDBModel>(x));
  }

  getById(id: number): Observable<UsersDBModel & User> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/users/id/${id}`).map(x => <UsersDBModel & User>x);
  }

  getByEmail(email: string): Observable<UsersDBModel & User> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/users/${email}`).map(x => <UsersDBModel & User>x);
  }

}
