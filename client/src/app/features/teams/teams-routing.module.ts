import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './teams-routes';

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
