import { CanActivate, ActivatedRouteSnapshot, Router, ActivatedRoute } from "@angular/router";
import { Injectable } from "@angular/core";
import { RouterStateSnapshot } from "@angular/router/src/router_state";
import { Observable } from "rxjs/Observable";
import { TicketsService } from "./tickets.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class TicketGuard implements CanActivate {
  result: boolean;

  constructor(private ticketService: TicketsService, private jwtService: JwtHelperService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const urlTicketId = route.params['id'];
    const userId = this.jwtService.decodeToken(localStorage.getItem('access_token'));

    return this.ticketService.getById(+urlTicketId).map((data) => {
      // const tickets = data['info']['Users'].find((user) => user.id === userId);

      console.log(data['info']['Users']);
      const validate = data['info']['Users'].find((user) => user.id === +userId.id);
      console.log(validate,'asdasd');
      this.result = validate ? true : false;

      console.log(this.result);
      return this.result;
    });
  }

}
