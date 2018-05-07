import { CanActivate, ActivatedRouteSnapshot, Router, ActivatedRoute } from "@angular/router";
import { Injectable } from "@angular/core";
import { RouterStateSnapshot } from "@angular/router/src/router_state";
import { Observable } from "rxjs/Observable";
import { TicketsService } from "./tickets.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { TeamsService } from "./teams.service";

@Injectable()
export class TicketGuard implements CanActivate {
  fromUsers: boolean;
  fromTeams: boolean;
  constructor(private ticketService: TicketsService, private jwtService: JwtHelperService,
    private activatedRoute: ActivatedRoute,
    private teamService: TeamsService,
    private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const urlTicketId = +route.params['id'];
    const userId = this.jwtService.decodeToken(localStorage.getItem('access_token'));

    return this.ticketService.getById(+urlTicketId).map((data) => {
      const fromUsers = data['info']['Users'].find((user) => user.id === userId.id);
        this.fromUsers = fromUsers ? true : false;

      // this.teamService.getById(+data['info']['TeamId']).subscribe((data) => {
      //   const userInTeam = data['info']['Users'].find((user) => user.id === userId.id);

      //   this.fromTeams = userInTeam ? true : false;

      //   console.log(this.fromUsers, this.fromTeams, 'aslsa');
      //   return (this.fromTeams || this.fromUsers);
      // });
      return (this.fromUsers);
    });
  }

}
