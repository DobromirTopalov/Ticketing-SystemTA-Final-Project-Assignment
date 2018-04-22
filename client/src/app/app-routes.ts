import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { RegisterComponent } from './auth/register.component';
import { LoginComponent } from './auth/login.component';
import { TicketsComponent } from './features/tickets/tickets.component';
import { DetailsComponent } from './features/tickets/details/details.component';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'tickets', children: [
      { path: '', component: TicketsComponent, pathMatch: 'full' },
      { path: ':id', component: DetailsComponent }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent }
];
