import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { CommonModule } from '@angular/common';
import { TicketsComponent } from './tickets.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
    declarations: [
      TicketsComponent,
      DetailsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule
    ],
    exports: [
      TicketsComponent,
      DetailsComponent
    ]

})
export class TicketsModule { }
