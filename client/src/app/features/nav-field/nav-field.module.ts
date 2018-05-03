import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavFieldComponent } from './nav-field.component';
import { SharedModule } from '../../shared';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    NavFieldComponent
  ],
  exports: [
    NavFieldComponent
  ]
})
export class NavFieldModule { }
