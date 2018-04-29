import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Team } from '../models/teams/teams';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';
import { User } from '../models/users/user';
import { UsersModel } from '../models/users/usersModel';
import { UsersInATeam } from '../models/users/usersInATeam';
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

  createNewTeam(name: string, description: string, teamImgUrl: string | null, CompanyId: number, TeamLeaderId: number, options?: HttpOptions): Observable<Object> {
    console.log(name, description, teamImgUrl, TeamLeaderId, CompanyId);
    console.log(`${this.appConfig.apiUrl}/teams/create`);
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

  getAllUsers(id: number): Observable<UsersInATeam> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/teams/${id}`).map(x => <UsersInATeam>(x));
  }

}
