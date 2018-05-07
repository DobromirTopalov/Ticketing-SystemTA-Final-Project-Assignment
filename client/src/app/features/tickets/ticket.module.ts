import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { CommonModule } from '@angular/common';
import { TicketsComponent } from './tickets.component';
import { DetailsComponent } from './details/details.component';
import { SingleTicketComponent } from './single-ticket/single-ticket.component';
import { CommentaryListComponent } from '../commentary/commentary-list/commentary-list.component';
import { CommentaryPostComponent } from '../commentary/commentary-post/commentary-post.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { TeamTicketsComponent } from './team-tickets/team-tickets.component';
import { TicketsRoutingModule } from './tickets-routing.module';
import { CoreModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TicketsComponent,
    DetailsComponent,
    SingleTicketComponent,
    CommentaryListComponent,
    CommentaryPostComponent,
    CreateTicketComponent,
    TeamTicketsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TicketsRoutingModule,
    CoreModule,
    ReactiveFormsModule,
  ],
  exports: [
    TicketsComponent,
    DetailsComponent,
    TeamTicketsComponent,
    SingleTicketComponent,
    CommentaryListComponent,
    CommentaryPostComponent,
    CreateTicketComponent,
  ],

})
export class TicketsModule { }
