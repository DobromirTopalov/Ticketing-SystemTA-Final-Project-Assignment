import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/auth-guard';
import { TeamsComponent } from './teams/teams.component';
import { SingleTeamComponent } from './single-team/single-team.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TicketGuard } from '../../core/ticket-guard';
import { TeamTicketsComponent } from '../tickets/team-tickets/team-tickets.component';
import { TeamGuard } from '../../core/team-guard';
import { TicketGuard2 } from '../../core/ticket2-guard';

export const ROUTES: Routes = [
  { path: '', component: TeamsComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'create', component: CreateTeamComponent, canActivate: [AuthGuard] },
  {
    path: ':id', children: [
      { path: '', component: SingleTeamComponent, pathMatch: 'full', canActivate: [AuthGuard, TeamGuard] },
      { path: 'tickets', component: TeamTicketsComponent, canActivate: [AuthGuard, TicketGuard]},
    ]
  },
];
