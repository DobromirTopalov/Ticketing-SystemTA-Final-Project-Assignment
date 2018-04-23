import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { User } from '../models/users/user';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app.config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {
  users: User[];

  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  getAll(): Observable<User[]> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/users`).map(x => <User[]>(x));
  }

  getById(id: number): Observable<User> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/users/${id}`).map(x => <User>x);
  }

}
