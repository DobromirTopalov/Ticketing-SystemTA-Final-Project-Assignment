import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { TeamsComponent } from './teams.component';
import { TeamDetailsComponent } from './details/team-details.component';
import { SingleTeamComponent } from './single-team/single-team.component';
import { CreateTeamComponent } from './create-team/create-team.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
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
  ]
})
export class TeamsModule { }
