import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { SingleUserComponent } from './single-user/single-user.component';
import { UsersRoutingModule } from './users-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  declarations: [SingleUserComponent]
})
export class UsersModule { }
