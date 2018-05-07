import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/auth-guard';
import { TeamsComponent } from './teams.component';
import { SingleTeamComponent } from './single-team/single-team.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TicketGuard } from '../../core/ticket-guard';
import { TeamTicketsComponent } from '../tickets/team-tickets/team-tickets.component';

export const ROUTES: Routes = [
  { path: '', component: TeamsComponent, pathMatch: 'full' },
  { path: 'create', component: CreateTeamComponent },
  {
    path: ':id', children: [
      { path: '', component: SingleTeamComponent, pathMatch: 'full' },
      { path: 'tickets', component: TeamTicketsComponent, },
    ]
  },
];
