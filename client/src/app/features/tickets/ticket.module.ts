import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared';
import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { SingleTicketComponent } from './single-ticket/single-ticket.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { TeamTicketsComponent } from './team-tickets/team-tickets.component';
import { CommentaryListComponent } from '../commentary/commentary-list/commentary-list.component';
import { CommentaryPostComponent } from '../commentary/commentary-post/commentary-post.component';


@NgModule({
  declarations: [
    TicketsComponent,
    SingleTicketComponent,
    CreateTicketComponent,
    TeamTicketsComponent,
    CommentaryListComponent,
    CommentaryPostComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    CoreModule,
    SharedModule,
    TicketsRoutingModule,
  ],
  exports: [
    TicketsComponent,
    SingleTicketComponent,
    CreateTicketComponent,
    CommentaryListComponent,
    CommentaryPostComponent,
    TeamTicketsComponent,
  ],

})
export class TicketsModule { }
