import { Routes } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { SingleTicketComponent } from './single-ticket/single-ticket.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { TeamTicketsComponent } from './team-tickets/team-tickets.component';
import { AuthGuard } from '../../core/auth-guard';
import { TicketGuard } from '../../core/ticket-guard';
import { TicketGuard2 } from '../../core/ticket2-guard';

export const ROUTES: Routes = [
  { path: '', component: TicketsComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'opencreate', component: CreateTicketComponent, canActivate: [AuthGuard] },
  { path: ':id', component: SingleTicketComponent, canActivate: [AuthGuard, TicketGuard]},
];
