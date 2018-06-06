import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { SnackBarComponentExample } from './snackbar/snack-bar-component-example';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    SnackBarComponentExample,
  ],
  exports: [
    SnackBarComponentExample,
  ]
})
export class SnackBarModule { }
