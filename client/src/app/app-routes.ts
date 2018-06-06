import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/auth-guard';
import { CreateTeamComponent } from './features/teams/create-team/create-team.component';
import { TicketGuard } from './core/ticket-guard';
// import { TeamGuard } from './core/team-guard';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'profile', loadChildren: './features/administration/administration.module#AdministrationModule', canActivate: [AuthGuard],
  },
  {
    path: 'tickets', loadChildren: './features/tickets/ticket.module#TicketsModule', canActivate: [AuthGuard],
  },
  {
    path: 'teams', loadChildren: './features/teams/teams.module#TeamsModule', canActivate: [AuthGuard],
  },
  {
    path: 'users', loadChildren: './features/users/users.module#UsersModule', canActivate: [AuthGuard],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent },
];
