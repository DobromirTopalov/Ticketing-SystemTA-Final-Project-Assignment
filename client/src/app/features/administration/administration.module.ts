import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { AdminComponent } from './admin/admin.component';
import { CoreModule } from '../../core/core.module';
import { SnackBarModule } from '../snackbar/snackbar.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TicketsModule } from '../tickets/ticket.module';
import { TeamsModule } from '../teams/teams.module';
import { ProfileComponent } from './profile/profile.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import { DialogOverviewExampleDialogComponent } from './dialog-overview-example-dialog/dialog-overview-example-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    CoreModule,
    SnackBarModule,
    ReactiveFormsModule,
    AdministrationRoutingModule,
  ],
  declarations: [
    AdminComponent,
    ProfileComponent,
    DialogOverviewExampleDialogComponent,
  ],
  exports: [
    AdminComponent,
    ProfileComponent,
    DialogOverviewExampleDialogComponent,
  ],
  entryComponents: [DialogOverviewExampleDialogComponent],
})
export class AdministrationModule { }
