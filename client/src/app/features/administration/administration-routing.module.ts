import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './administration-routes';

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
