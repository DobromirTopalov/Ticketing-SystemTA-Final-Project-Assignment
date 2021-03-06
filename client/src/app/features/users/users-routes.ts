import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/auth-guard';
import { TicketGuard } from '../../core/ticket-guard';
import { SingleUserComponent } from './single-user/single-user.component';

export const ROUTES: Routes = [
      { path: '', component: SingleUserComponent, pathMatch: 'full' , canActivate: [AuthGuard]},
      { path: ':id', component: SingleUserComponent, canActivate: [AuthGuard] },
];
