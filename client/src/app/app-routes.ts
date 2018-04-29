import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { RegisterComponent } from './auth/register.component';
import { LoginComponent } from './auth/login.component';
import { TicketsComponent } from './features/tickets/tickets.component';
import { DetailsComponent } from './features/tickets/details/details.component';
import { AuthGuard } from './core/auth-guard';
import { TeamsComponent } from './features/teams/teams.component';
import { SingleTeamComponent } from './features/teams/single-team/single-team.component';
import { SingleTicketComponent } from './features/tickets/single-ticket/single-ticket.component';
import { CreateTicketComponent } from './features/tickets/create-ticket/create-ticket.component';
import { CreateTeamComponent } from './features/teams/create-team/create-team.component';
// import { TeamGuard } from './core/team-guard';
// import { TeamGuard } from './core/team-guard';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'homeSofia', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'tickets', children: [
      { path: '', component: TicketsComponent, pathMatch: 'full' },
      { path: 'opencreate', component: CreateTicketComponent},
      { path: ':id', component: SingleTicketComponent},
    ]
  },
  {
    path: 'teams', children: [
      { path: '', component: TeamsComponent, pathMatch: 'full' },
      { path: 'create', component: CreateTeamComponent },
      { path: ':id', component: SingleTeamComponent },
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent }
];
