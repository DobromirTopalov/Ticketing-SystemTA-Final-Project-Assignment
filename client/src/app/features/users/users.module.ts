import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { SingleUserComponent } from './single-user.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [SingleUserComponent]
})
export class UsersModule { }
