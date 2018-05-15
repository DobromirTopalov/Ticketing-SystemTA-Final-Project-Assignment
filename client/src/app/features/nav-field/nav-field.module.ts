import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { NavFieldComponent } from './nav-field/nav-field.component';

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
