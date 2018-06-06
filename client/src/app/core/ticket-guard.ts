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
  fromTicket: boolean;
  fromTeams: boolean;
  access: any;


  constructor(
    private ticketService: TicketsService,
    private jwtService: JwtHelperService,
    private activatedRoute: ActivatedRoute,
    private teamService: TeamsService,
    private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const urlTicketId = +route.params['id'];
    const userId = this.jwtService.decodeToken(localStorage.getItem('access_token'));

    return this.ticketService.getById(+urlTicketId).map((data) => {
      const fromTicket = data.info.Users.find((user) => user.id === userId.id);

      this.access = (data.info.EscalationContactId === userId.id ||
                     data.info.AssigneeId === userId.id ||
                     data.info.RequesterId === userId ||
                     this.fromTicket || true);

      if (this.access) {
        return true;
      }

      this.router.navigate(['/home']);
      return false;
    });
  };
}
