import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuard } from '../../core/auth-guard';
import { TicketGuard } from '../../core/ticket-guard';

export const ROUTES: Routes = [
  // { path: '', component: ProfileComponent, pathMatch: 'full' },
  { path: '', component: AdminComponent, pathMatch: 'full' },
  { path: 'admin', component: AdminComponent, canActivate: [] },
];
