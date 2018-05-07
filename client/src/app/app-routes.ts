import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { RegisterComponent } from './auth/register.component';
import { LoginComponent } from './auth/login.component';
import { AuthGuard } from './core/auth-guard';
import { CreateTeamComponent } from './features/teams/create-team/create-team.component';
import { TicketGuard } from './core/ticket-guard';
// import { TeamGuard } from './core/team-guard';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'homeSofia', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'tickets', loadChildren: './features/tickets/ticket.module#TicketsModule'
  },
  {
    path: 'teams', loadChildren: './features/teams/teams.module#TeamsModule'
  },
  {
    path: 'users', loadChildren: './features/users/users.module#UsersModule',
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent },
];
