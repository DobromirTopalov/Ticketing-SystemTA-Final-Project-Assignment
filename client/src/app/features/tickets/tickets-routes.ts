import { Routes } from '@angular/router';
import { TicketsComponent } from './tickets.component';
import { DetailsComponent } from './details/details.component';
import { AuthGuard } from '../../core/auth-guard';
import { SingleTicketComponent } from './single-ticket/single-ticket.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { TicketGuard } from '../../core/ticket-guard';
import { TeamTicketsComponent } from './team-tickets/team-tickets.component';

export const ROUTES: Routes = [
  { path: '', component: TicketsComponent, pathMatch: 'full' },
  { path: 'opencreate', component: CreateTicketComponent },
  { path: ':id', component: SingleTicketComponent, canActivate: [] },
];
