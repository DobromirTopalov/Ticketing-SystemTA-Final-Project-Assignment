import { CanActivate, ActivatedRouteSnapshot, Router, ActivatedRoute } from "@angular/router";
import { Injectable } from "@angular/core";
import { RouterStateSnapshot } from "@angular/router/src/router_state";
import { Observable } from "rxjs/Observable";
import { TeamsService } from "./teams.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class TeamGuard implements CanActivate {
  constructor(
    private jwtService: JwtHelperService,
    private activatedRoute: ActivatedRoute,
    private teamService: TeamsService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean | Observable<boolean> | Promise<boolean> {
    const currentTeam = +route.params['id'];
    const userId = this.jwtService.decodeToken(localStorage.getItem('access_token'));

    return this.teamService.getAllUsersFromTeam(+currentTeam).map((data) => {
      const fromUsers = data.info.find((user) => +user.UserId === +userId.id);

      if (fromUsers) {
        return true;
      }

      this.router.navigate(['/home']);
      return false;
    });
  }
}
