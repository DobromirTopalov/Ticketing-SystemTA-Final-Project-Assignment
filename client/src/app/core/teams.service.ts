import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Team } from '../models/teams/teams';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';
import { HttpOptions } from '../models/core/http-options';
import { TeamsModel } from '../models/teams/teamsModel';

@Injectable()
export class TeamsService {

  teams: Team[];

  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  getAll(): Observable<TeamsModel[]> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/teams`).map(x => <TeamsModel[]>(x));
  }

  getById(id: number): Observable<TeamsModel> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/teams/${id}`).map(x => <TeamsModel>x);
  }

  addUserToTeam(userId: number, teamId: number, options?: HttpOptions): Observable<Object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/teams/${teamId}`, { UserId: userId, TeamId: teamId }, options);
  }

  userLeaveTeam(userId: number, teamId: number, options?: HttpOptions): Observable<Object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/teams/${teamId}/leave`, { UserId: userId, TeamId: teamId }, options);
  }
}
