import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { CommonModule } from '@angular/common';
import { TicketsComponent } from './tickets.component';
import { DetailsComponent } from './details/details.component';
import { SingleTicketComponent } from './single-ticket/single-ticket.component';
import { CommentaryListComponent } from '../commentary/commentary-list/commentary-list.component';
import { CommentaryPostComponent } from '../commentary/commentary-post/commentary-post.component';


@NgModule({
    declarations: [
      TicketsComponent,
      DetailsComponent,
      SingleTicketComponent,
      CommentaryListComponent,
      CommentaryPostComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule
    ],
    exports: [
      TicketsComponent,
      DetailsComponent,
      SingleTicketComponent,
      CommentaryListComponent,
      CommentaryPostComponent
    ]

})
export class TicketsModule { }
