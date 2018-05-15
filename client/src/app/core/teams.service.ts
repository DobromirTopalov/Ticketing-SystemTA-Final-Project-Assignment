import 'rxjs/add/operator/map';
import { AppConfig } from '../config/app.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpOptions } from '../models/core/http-options';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/users/user';
import { UsersDBModel } from '../models/users/usersDBModel';
import { Team } from '../models/teams/team';
import { TeamsDBModel } from '../models/teams/teamsDBModel';

@Injectable()
export class TeamsService {
  constructor(
    private appConfig: AppConfig,
    private httpClient: HttpClient) { }

  getAll(): Observable<TeamsDBModel & Team[]> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/teams`).map(x => <TeamsDBModel & Team[]>(x));
  }

  getById(id: number): Observable<TeamsDBModel & Team> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/teams/${id}`).map(x => <TeamsDBModel & Team>x);
  }

  createNewTeam(name: string, description: string, teamImgUrl: string | null, CompanyId: number, TeamLeaderId: number, options?: HttpOptions): Observable<Object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/teams/create`, {
      name,
      description,
      teamImgUrl,
      TeamLeaderId,
      CompanyId,
    },
      options);
  }

  addUserToTeam(userId: number, teamId: number, options?: HttpOptions): Observable<Object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/teams/${teamId}`, { UserId: userId, TeamId: teamId }, options);
  }

  userLeaveTeam(userId: number, teamId: number, options?: HttpOptions): Observable<Object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/teams/${teamId}/leave`, { UserId: userId, TeamId: teamId }, options);
  }

  setNewTeamLeader(userId: number, teamId: number, options?: HttpOptions): Observable<Object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/teams/${teamId}/leader`, { UserId: userId, TeamId: teamId }, options);
  }

  getAllUsersFromTeam(id: number): Observable<UsersDBModel> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/teams/users/${id}`).map(x => <UsersDBModel>(x));
  }

  getUserFromTeam(id: number): Observable<User> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/teams/usersId/${id}`).map(x => <User>(x));
  }
}
