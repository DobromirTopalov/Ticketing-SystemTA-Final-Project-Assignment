import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';
import { TeamDetailsComponent } from './details/team-details.component';
import { SingleTeamComponent } from './single-team/single-team.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TeamsRoutingModule } from './teams-routing.module';
import { CoreModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamTicketsComponent } from '../tickets/team-tickets/team-tickets.component';
import { TicketsModule } from '../tickets/ticket.module';
import { SnackBarModule } from '../snackbar/snackbar.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TeamsRoutingModule,
    SnackBarModule,
    CoreModule,
    ReactiveFormsModule,
    TicketsModule
  ],
  declarations: [
    TeamsComponent,
    TeamDetailsComponent,
    SingleTeamComponent,
    CreateTeamComponent
  ],
  exports: [
    TeamsComponent,
    TeamDetailsComponent,
    SingleTeamComponent,
    CreateTeamComponent
  ],
  entryComponents: [TeamTicketsComponent],
})
export class TeamsModule { }
