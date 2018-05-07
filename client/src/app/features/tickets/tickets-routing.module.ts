import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './tickets-routes';

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
