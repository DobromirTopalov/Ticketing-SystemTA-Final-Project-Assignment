import { Routes } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { SingleTicketComponent } from './single-ticket/single-ticket.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { TeamTicketsComponent } from './team-tickets/team-tickets.component';
import { AuthGuard } from '../../core/auth-guard';
import { TicketGuard } from '../../core/ticket-guard';

export const ROUTES: Routes = [
  { path: '', component: TicketsComponent, pathMatch: 'full' },
  { path: 'opencreate', component: CreateTicketComponent },
  { path: ':id', component: SingleTicketComponent, canActivate: [] },
];
