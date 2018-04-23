import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Team } from '../models/teams/teams';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';

@Injectable()
export class TeamsService {

  teams: Team[];

  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  getAll(): Observable<Team[]> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/teams`).map(x => <Team[]>(x));
  }

  getById(id: number): Observable<Team> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/teams/${id}`).map(x => <Team>x);
  }
}
