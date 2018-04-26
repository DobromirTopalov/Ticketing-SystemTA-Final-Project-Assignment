import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { User } from '../models/users/user';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app.config';
import { Observable } from 'rxjs/Observable';
import { UsersInCompanyModel } from '../models/users/usersInCompanyModel';


@Injectable()
export class UsersService {
  users: User[];

  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  getAll(): Observable<UsersInCompanyModel> {
    return this.httpClient.get<UsersInCompanyModel>(`${this.appConfig.apiUrl}/users`);
  }

  getById(id: number): Observable<UsersInCompanyModel> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/users/${id}`).map(x => <UsersInCompanyModel>x);
  }

}
