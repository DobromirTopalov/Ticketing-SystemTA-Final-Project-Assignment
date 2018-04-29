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
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class TeamsService {

  teams: Team[];
  teamId: number;
  team: Team[];

  constructor(private httpClient: HttpClient,
    private appConfig: AppConfig,
    private jwtService: JwtHelperService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  getAll(): Observable<TeamsModel[]> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/teams`).map(x => <TeamsModel[]>(x));
  }

  getById(id: number): Observable<Team> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/teams/${id}`).map(x => <Team>x);
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
    console.log(userId, teamId);
    return this.httpClient.post(`${this.appConfig.apiUrl}/teams/${teamId}/leader`, { UserId: userId, TeamId: teamId }, options);
  }

  getAllUsers(id: number): Observable<UsersInATeam> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/teams/${id}`).map(x => <UsersInATeam>(x));
  }

  // isUserInTeam(): boolean {
  //   let canViewTeam = false;
  //   const decodedToken = this.jwtService.decodeToken(localStorage.getItem('access_token'));
  //   const loggedUserId = decodedToken.id;
  //   this.activatedRoute.params
  //     .subscribe(x => {
  //       console.log(x);
  //       this.teamId = x['id'];
  //       console.log(this.teamId);
  //       this.getById(1).subscribe(
  //         data => {
  //           console.log(data);
  //           this.team = data['info'];
  //           console.log(this.team[0]);
  //           console.log(this.team['Users']);
  //           // this.team.Users.forEach((user) => {
  //           //   if (user.id === loggedUserId) {
  //           //     canViewTeam = true;
  //           //   }
  //           // });
  //         },
  //       );
  //     });

  //   return canViewTeam;
  // }
  getAllTeamUsers(id: number): Observable<UsersModel> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/teams/users/${id}`).map(x => <UsersModel>(x));
  }

  getUserTeam(id: number): Observable<UsersModel> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/teams/usersId/${id}`).map(x => <UsersModel>(x));
  }
}
