import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { TeamsService } from './teams.service';
import { TicketsService } from './tickets.service';
import { ParamsService } from './params.service';
import { AuthGuard } from './auth-guard';
import { TicketGuard } from './ticket-guard';
import { TeamGuard } from './team-guard';
import { TicketGuard2 } from './ticket2-guard';
// import { TeamGuard } from './team-guard';

@NgModule({
  providers: [
    AuthService,
    UsersService,
    TeamsService,
    TicketsService,
    ParamsService,
    AuthGuard,
    TeamGuard,
    TicketGuard,
    TicketGuard2,
  ]
})
export class CoreModule { }
